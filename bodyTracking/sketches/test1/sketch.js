import TrackingInstance from './TrackingInstance.js';

let tracker;

const test1 = (p) => {
    p.preload = () => {
        tracker = new TrackingInstance(p, 'webcam');
    }

    p.setup = async () => {
        p.createCanvas(720, 480);
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

        const showBgVid = p.createCheckbox('Show Background Video', true).addClass('form-check-input');
        showBgVid.changed(e => {
            tracker.showBgVideo(e.target.checked);
        });
    }

    p.draw = () => {
        p.background(0,0,0);
        tracker.display();
        // p.translate(200,0);
        // tracker.display();
    }
}

export default test1;