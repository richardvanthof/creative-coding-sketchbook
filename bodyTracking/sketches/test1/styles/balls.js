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