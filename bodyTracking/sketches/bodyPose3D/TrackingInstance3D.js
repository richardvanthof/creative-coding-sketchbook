
class TrackingInstance3D {
    constructor(p, source) {
        this.p = p;
        this.currentStyle = 'debug';
        this.model = null;
        this.bodyPosePromise = null;
        this.poses = [];
        this.connections = [];
        this.video = null;
        this.pendingStream = null;
        this.smoothedKeypoints = [];
        this.smoothingFactor = 0.6;
        this.config = {
            showVideo: true
        }
        this.source = source;
        this.bodyPosePromise = ml5.bodyPose("BlazePose");
    }

    async init() {
        this.model = await this.bodyPosePromise;
        this.connections = this.model.getSkeleton();
        this.loadVideoSource(this.source);
    };

    gotPoses = (results) => {
        this.poses = results;

        if (!this.poses.length) {
            this.smoothedKeypoints = [];
            return;
        }

        this.poses.forEach((pose, poseIndex) => {
           
            const keypoints3D = Array.isArray(pose.keypoints3D) ? pose.keypoints3D : [];
            const keypoints2D = Array.isArray(pose.keypoints) ? pose.keypoints : [];
            const keypoints = keypoints3D.length ? keypoints3D : keypoints2D;
            if (!keypoints.length) {
                this.smoothedKeypoints[poseIndex] = [];
                return;
            }
            if (!this.smoothedKeypoints[poseIndex] || this.smoothedKeypoints[poseIndex].length !== keypoints.length) {
                this.smoothedKeypoints[poseIndex] = keypoints.map(point => ({
                    x: point.x,
                    y: point.y,
                    z: point.z ?? 0,
                    confidence: point.confidence ?? 0
                }));
                return;
            }

            const buffer = this.smoothedKeypoints[poseIndex];
            keypoints.forEach((point, pointIndex) => {
                if (!point) {
                    return;
                }
                const cached = buffer[pointIndex];
                if (!cached) {
                    buffer[pointIndex] = {
                        x: point.x,
                        y: point.y,
                        z: point.z ?? 0,
                        confidence: point.confidence ?? 0
                    };
                    return;
                }

                cached.x = this.p.lerp(cached.x, point.x, this.smoothingFactor);
                cached.y = this.p.lerp(cached.y, point.y, this.smoothingFactor);
                cached.z = this.p.lerp(cached.z, point.z ?? 0, this.smoothingFactor);
                cached.confidence = point.confidence ?? cached.confidence ?? 0;
            });
        });

        this.smoothedKeypoints.length = this.poses.length;
    }

    startDetection() {
        if (!this.video) {
            return;
        }

        if (!this.model) {
            this.bodyPosePromise.then(model => {
                this.model = model;
                if (!this.connections.length) {
                    this.connections = model.getSkeleton();
                }
                this.startDetection();
            });
            return;
        }

        const { elt } = this.video;
        const beginDetection = () => {
            this.model.detectStart(this.video, this.gotPoses);
        };

        if (elt && elt.readyState >= 2) {
            beginDetection();
        } else if (elt) {
            const handleLoadedData = () => {
                elt.removeEventListener('loadeddata', handleLoadedData);
                beginDetection();
            };
            elt.addEventListener('loadeddata', handleLoadedData);
        }
    }

    loadVideoSource(source) {
        const requestedSource = source || this.source;
        this.source = requestedSource;

        if (this.video) {
            if (this.video.elt && this.video.elt.srcObject) {
                const tracks = this.video.elt.srcObject.getTracks?.() || [];
                tracks.forEach(track => track.stop());
            }
            this.video.remove();
            this.video = null;
            this.pendingStream = null;
        }

        if (requestedSource === 'webcam') {
            this.pendingStream = this.p.createCapture(this.p.VIDEO, () => this.startDetection());
            this.video = this.pendingStream;
            this.video.elt.setAttribute('playsinline', '');
        } else {
            const movie = this.p.createVideo([requestedSource], () => {
                movie.volume(0);
                movie.loop();
                movie.elt.muted = true;
                movie.elt.setAttribute('playsinline', '');
                movie.play();
                this.startDetection();
            });
            movie.elt.playsInline = true;
            this.video = movie;
        }

        this.video.size(this.p.width, this.p.height);
        this.video.hide();
    }

    drawDebugSkeleton() {
        const { p, poses, connections, smoothedKeypoints } = this;
        if (!poses.length || !connections.length) return;

        const toCanvasSpace = (point) => {
            if (!point) return null;
            const hasZ = Number.isFinite(point.z);
            if (!hasZ) {
                return { x: point.x, y: point.y, z: 0 };
            }
            return {
                x: (point.x - 0.5) * p.width/2,
                y: (point.y - 0.5) * p.height/2,
                z: -point.z * p.width
            };
        };

        p.push();
        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            const smoothed = smoothedKeypoints[i];
            const use3D = !!(pose.keypoints3D && pose.keypoints3D.length);

            for (let j = 0; j < connections.length; j++) {
                const [aIdx, bIdx] = connections[j];
                const baseA = use3D ? pose.keypoints3D[aIdx] : pose.keypoints[aIdx];
                const baseB = use3D ? pose.keypoints3D[bIdx] : pose.keypoints[bIdx];
                const pointAData = smoothed?.[aIdx] ?? baseA;
                const pointBData = smoothed?.[bIdx] ?? baseB;
                if (!pointAData || !pointBData) continue;

                const confA = pose.keypoints[aIdx]?.confidence ?? pointAData.confidence ?? 0;
                const confB = pose.keypoints[bIdx]?.confidence ?? pointBData.confidence ?? 0;
                if (confA <= 0.1 || confB <= 0.1) continue;

                const pointA = toCanvasSpace(pointAData);
                const pointB = toCanvasSpace(pointBData);
                if (!pointA || !pointB) continue;

                p.stroke(255, 0, 0);
                p.strokeWeight(2);
                if (use3D) {
                    p.line(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z);
                } else {
                    p.line(pointA.x, pointA.y, pointB.x, pointB.y);
                }
            }
        }

        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            const smoothed = smoothedKeypoints[i];
            const use3D = !!(pose.keypoints3D && pose.keypoints3D.length);

            for (let j = 0; j < pose.keypoints.length; j++) {
                const keypoint = pose.keypoints[j];
                if (keypoint.confidence <= 0.1) continue;

                const source = smoothed?.[j] ?? (use3D ? pose.keypoints3D[j] : keypoint);
                const point = toCanvasSpace(source);
                if (!point) continue;

                p.noStroke();
                p.fill(0, 255, 0);
                if (use3D) {
                    p.push();
                    p.translate(point.x, point.y, point.z);
                    p.sphere(5);
                    p.pop();
                } else {
                    p.circle(point.x, point.y, 10);
                }
            }
        }
        p.pop();
    }

    showBgVideo(active) {
        this.config.showVideo = active;
    }

    display(style) {
        
        //this.config.showVideo && this.p.image(this.video, 0, 0, this.p.width, this.p.height);
        if(!style || style === 'debug') this.drawDebugSkeleton();
        else style(this.poses, this.connections);
    }
}

export default TrackingInstance3D;