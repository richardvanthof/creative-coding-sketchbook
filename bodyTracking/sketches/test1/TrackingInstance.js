class TrackingInstance {
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
        this.smoothingFactor = 0.9;
        this.config = {
            showVideo: true,
            debugSkeleton: true
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
            const keypoints = pose.keypoints;
            if (!this.smoothedKeypoints[poseIndex]) {
                this.smoothedKeypoints[poseIndex] = keypoints.map(point => ({
                    x: point.x,
                    y: point.y,
                    confidence: point.confidence
                }));
                return;
            }

            const buffer = this.smoothedKeypoints[poseIndex];
            keypoints.forEach((point, pointIndex) => {
                const cached = buffer[pointIndex];
                if (!cached) {
                    buffer[pointIndex] = {
                        x: point.x,
                        y: point.y,
                        confidence: point.confidence
                    };
                    return;
                }

                cached.x = this.p.lerp(cached.x, point.x, this.smoothingFactor);
                cached.y = this.p.lerp(cached.y, point.y, this.smoothingFactor);
                cached.confidence = point.confidence;
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
        const connections = this.connections;
        for (let i = 0; i < this.poses.length; i++) {
            const pose = this.poses[i];
            const smoothed = this.smoothedKeypoints[i];
            for (let j = 0; j < connections.length; j++) {
                const pointAIndex = connections[j][0];
                const pointBIndex = connections[j][1];
                const pointAData = pose.keypoints[pointAIndex];
                const pointBData = pose.keypoints[pointBIndex];
                const pointA = smoothed && smoothed[pointAIndex] ? smoothed[pointAIndex] : pointAData;
                const pointB = smoothed && smoothed[pointBIndex] ? smoothed[pointBIndex] : pointBData;

                if (pointAData.confidence > 0.1 && pointBData.confidence > 0.1) {
                    this.p.stroke(255, 0, 0);
                    this.p.strokeWeight(2);
                    this.p.line(pointA.x, pointA.y, pointB.x, pointB.y);
                }
            }
        }

        for (let i = 0; i < this.poses.length; i++) {
            const pose = this.poses[i];
            const smoothed = this.smoothedKeypoints[i];
            for (let j = 0; j < pose.keypoints.length; j++) {
                const keypoint = pose.keypoints[j];
                if (keypoint.confidence > 0.1) {
                    const point = smoothed && smoothed[j] ? smoothed[j] : keypoint;
                    this.p.fill(0, 255, 0);
                    this.p.noStroke();
                    this.p.circle(point.x, point.y, 10);
                }
            }
        }
    }

    showBgVideo(active) {
        this.config.showVideo = active;
    }

    showDebugSkeleton(active) {
        this.config.debugSkeleton = active;
    }

    display(callbackStyle) {
        if (this.video) {
            if (this.config.showVideo) {
                this.p.image(this.video, 0, 0, this.p.width, this.p.height);
            } else {
                this.p.push();
                this.p.tint(255, 0);
                this.p.image(this.video, 0, 0, this.p.width, this.p.height);
                this.p.pop();
            }
        }
        this.config.debugSkeleton && this.drawDebugSkeleton();
        callbackStyle && callbackStyle(this.poses, this.smoothedKeypoints, this.connections);
    }
}

export default TrackingInstance;