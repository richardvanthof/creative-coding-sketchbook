let video;
let bodyPose;
let poses = [];
let connections;
let showVideo = true;
let toggleVideoButton;
let currentStyle = 'debug';
const bodyPose3D = (p) => {

    p.preload = () => {
       bodyPose = ml5.bodyPose("BlazePose");
    };

    p.setup = async () => {
        p.createCanvas(640, 480);
        video = p.createCapture(p.VIDEO);
        video.size(p.width, p.height);
        video.hide();

        p.createP('3D Pose model using BlazePose');
        const styles = p.createSelect().addClass('form-select mt-2 mb-2');
        styles.changed(e => currentStyle = e.target.value);
        styles.option('debug');


        toggleVideoButton = p.createButton('Show Video').addClass('btn btn-info mt-2 mb-2') ;
        toggleVideo(showVideo);
        toggleVideoButton.mousePressed(() => {
            console.log('toggle video btn pressed')
            showVideo = !showVideo;
            toggleVideo(showVideo);
        });
        const detector = bodyPose.detectStart(video, gotPoses);
        connections = bodyPose.getSkeleton();
    };

    p.draw = () => {
        p.background(0,0,0);
        //p.image(video, 0, 0, p.width, p.height);
        if(currentStyle === 'debug') {
            drawSkeleton();
        }
        
    };

    const gotPoses = (results) => {
        //console.log(results);
        poses = results;
    };

    const toggleVideo = (active) => {
        if (active) {
            video.show();
            toggleVideoButton.html('Hide Video');
        } else {
            video.hide();
            toggleVideoButton.html('Show Video');
        }
    }

    const drawSkeleton = () => {
        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            for (let j = 0; j < connections.length; j++) {
                const pointAIndex = connections[j][0];
                const pointBIndex = connections[j][1];
                const pointA = pose.keypoints[pointAIndex];
                const pointB = pose.keypoints[pointBIndex];
                if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                    p.stroke(255, 0, 0);
                    p.strokeWeight(2);
                    p.line(pointA.x, pointA.y, pointB.x, pointB.y);
                }
            }
        }

        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            for (let j = 0; j < pose.keypoints.length; j++) {
                const keypoint = pose.keypoints[j];
                if (keypoint.confidence > 0.1) {
                    p.fill(0, 255, 0);
                    p.noStroke();
                    p.circle(keypoint.x, keypoint.y, 10);
                }
            }
        }
    }

}

export default bodyPose3D;