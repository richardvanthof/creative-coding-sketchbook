

import TrackingInstance from './TrackingInstance.js';

let tracker;
let discoTexture;
let currentStyle;
let bgBlend;
const test1 = (p) => {
    

    p.preload = () => {
        tracker = new TrackingInstance(p, 'webcam');
    }

    p.setup = async () => {
        p.createCanvas(1280, 720, p.WEBGL);
        await tracker.init();
        tracker.showBgVideo(true);

        discoTexture = p.createGraphics(128, 128);
        discoTexture.pixelDensity(1);
        discoTexture.noStroke();
        const tileSize = 16;
        for (let y = 0; y < discoTexture.height; y += tileSize) {
            for (let x = 0; x < discoTexture.width; x += tileSize) {
                const shade = p.random(160, 255);
                discoTexture.fill(shade);
                discoTexture.rect(x, y, tileSize, tileSize);
            }
        }

        //DEBUG CONTROLS
        const styles = {
            none: null,
            points: discoBallStyle,
        };
        const style = p.createSelect().addClass('form-select mt-2 mb-2');
        style.option('None', 'none');
        style.option('Balls', 'points');
        style.changed(() => {
            currentStyle = styles[style.value()];
        });
        style.value('none');
        currentStyle = styles.none;

        const videoSource = p.createSelect().addClass('form-select mt-2 mb-2');
        videoSource.option('Webcam', 'webcam');
        videoSource.option('Dance', 'assets/videos/tiktok.mp4');
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
        
        bgBlend = p.createSlider(0,255, 255)
    }

    p.draw = () => {
    p.translate(-p.width/2, -p.height/2);
    p.background(0,0,0, bgBlend.value());
    p.ambientLight(40);
    p.directionalLight(120, 120, 255, -0.3, 0.8, -0.6);
    p.pointLight(255, 255, 255, p.width * 0.6, -p.height * 0.5, 300);
        tracker.display(currentStyle);
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
                    p.noStroke();

                        const x = point.x + p.sin(p.frameCount * 0.01 + i + j) * 30;
                        const y = point.y + p.sin(p.frameCount * 0.01 + i + j * 1.5) * 30;
                        p.push();
                            p.translate(x, y);
                            p.rotateY(p.frameCount * 0.02);
                            p.rotateZ(p.frameCount * 0.01);
                            if (discoTexture) {
                                p.texture(discoTexture);
                            }
                            p.sphere(15, 32, 24);
                        p.pop();
                }
            }
        }
    }
}

export default test1;