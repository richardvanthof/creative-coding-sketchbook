// 17.6: Sound Synthesis - p5.js Sound Tutorial - https://www.youtube.com/watch?v=Bk8rLzzSink&t=281s
// Sound Mini Series | EPISODE 1 - p5.Oscillator - https://www.youtube.com/watch?v=F8lXKWv5AL4

const sketch = (p) => {
    let wave;
    let waveType = 'sine';
    let playing = false;
    p.setup = () => {
        p.createCanvas(800, 400);
        wave = new p5.Oscillator();
        wave.setType(waveType);
        wave.freq(200);
        wave.amp(0.5);

        const playPauseButton = p.createButton('Play').addClass('btn btn-primary mt-2 mb-2');
        
        const waveTypeSelect = p.createSelect().addClass('form-select mt-2 mb-2');
        waveTypeSelect.option('sine');
        waveTypeSelect.option('triangle');
        waveTypeSelect.option('sawtooth');
        waveTypeSelect.option('square');

        waveTypeSelect.changed(() => {
            waveType = waveTypeSelect.value();
            if (wave) {
                wave.setType(waveType);
            }
        });
        
        playPauseButton.mousePressed(() => {
            if(playing) {
                playing = false;    
                playPauseButton.html('Play');
                wave.stop();
            } else {
                playing = true;
                playPauseButton.html('Pause');
                wave.start();
            };
        });
    };

    p.draw = () => {
        p.background(0);
        p.fill(100, 150, 250);
        p.ellipse(p.width / 2, p.height / 2, 50, 50);
    };
};

export default sketch;