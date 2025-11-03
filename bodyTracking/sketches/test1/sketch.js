import TrackingInstance from './TrackingInstance.js';

let tracker;

const test1 = (p) => {
    p.preload = () => {
        tracker = new TrackingInstance(p, 'webcam');
    }

    p.setup = async () => {
        p.createCanvas(1280, 720, p.WEBGL);
        await tracker.init();
        tracker.showBgVideo(true);

        //DEBUG
        const style = p.createSelect().addClass('form-select mt-2 mb-2');
        style.option('debug');
        style.option('points');
        style.option('skeleton');

        const videoSource = p.createSelect().addClass('form-select mt-2 mb-2');
        videoSource.option('Webcam', 'webcam');
        videoSource.option('TikTok', 'assets/videos/tiktok.mp4');
        videoSource.option('Workout', 'assets/videos/workout.mov');
        videoSource.changed(e => {
            tracker.loadVideoSource(e.target.value);
        });

        const showBgVid = p.createCheckbox('Show Background Video', true);
        showBgVid.changed(e => {
            tracker.showBgVideo(e.target.checked);
        });

        const showDebugSkeleton = p.createCheckbox('Show Debug Skeleton', true);
        showDebugSkeleton.changed(e => {
            console.log('show debug skeleton changed', e.target.checked);
            tracker.showDebugSkeleton(e.target.checked);
        });
    }

    p.draw = () => {
        p.translate(-p.width/2, -p.height/2);
        p.background(0,0,0, 50);
        tracker.display(discoBallStyle);
        p.orbitControl();
        // p.translate(200,0);
        // tracker.display();
    }

    const discoBallStyle = (poses, smoothedKeypoints, connections) => {
        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            const smoothed = smoothedKeypoints[i];
            for (let j = 0; j < pose.keypoints.length; j++) {
                const keypoint = pose.keypoints[j];
                if (keypoint.confidence > 0.1) {
                    const point = smoothed && smoothed[j] ? smoothed[j] : keypoint;
                    p.fill(0, 255, 0);
                    p.noStroke();

                    p.push();
                        p.translate(point.x, point.y);
                        p.sphere(30);
                    p.pop()
                }
            }
        }
    }
}

export default test1;