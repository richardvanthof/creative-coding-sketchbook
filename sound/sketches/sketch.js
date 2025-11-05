// 17.6: Sound Synthesis - p5.js Sound Tutorial - https://www.youtube.com/watch?v=Bk8rLzzSink&t=281s
// Sound Mini Series | EPISODE 1 - p5.Oscillator - https://www.youtube.com/watch?v=F8lXKWv5AL4

import Enimies from './Enemies.js';
import Ball from './Ball.js';
import Player from './Player.js';

const sketch = (p) => {
    let enemies, ball, player;
    let playerSize = {w: 75, h:20};
    let moveSpeed = 10;
    let ballSize = 15;
    let lives;
    let state = 'start'; // 'start', 'success', 'playing', 'gameover'
    let soundActive = true;
    let successSound;
    let successSoundPlayed = false;

    p.preload = () => {
        p.soundFormats('mp3');
        successSound = p.loadSound('assets/sounds/windows');
    }
    
    p.setup = () => {
        p.createCanvas(600, 600);
        enemies = new Enimies(p, 15, 15, 2);
        ball = new Ball(p, p.width/2, p.height/2, ballSize);
        player = new Player(p, p.width/2, playerSize.w, playerSize.h, moveSpeed);
        enemies.getTargets();
    };

    p.draw = () => {
        p.background(150);
        p.fill(255);
        p.push();
            p.fill(0)
            p.textSize(12)
            p.text(soundActive ? 'Sound: ON' : 'Sound: OFF', p.width - 80, p.height - 20);
        p.pop();
        if(state === 'playing') {
            setViewSounds(true)
            playView();
        } else if(state === 'gameover') {
            setViewSounds(false)
            gameOverView();
        }
        else if(state === 'success') {
            setViewSounds(false)
            successView();
        } else {
            setViewSounds(false)
            startView();
        }
    };

    p.keyPressed = () => {
        if (state !== 'playing' && p.key === ' ') {
            restart();
        }

        if(p.key === 's') {
            toggleSound();
        }

        // Secret cheats
        if(p.key === 'd') {
            state = 'success';
        }

        if(p.key === 'f') {
            state = 'gameover';
        }
    };

    p.mousePressed = () => {
        enemies.getTargets();
        console.log(enemies.targets);
    }

    const setViewSounds = (active) => {
        ball.sound = active;
        enemies.sound = active;
        player.sound = active;
    }

    const toggleSound = () => {
        soundActive = !soundActive;
        ball.sound = soundActive;
        enemies.sound = soundActive;
        player.sound = soundActive;

        if (!soundActive && successSound.isPlaying()) {
            successSound.stop();
            successSoundPlayed = false;
        }
    }

    const restart = () => {
        ball.reset();
        enemies.reset();
        successSoundPlayed = false;
        lives = ball.lives;
        state = 'playing';
    }

    const gameOverView = () => {
        p.push()
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(32);
            p.fill(0);
            p.text('Game Over! Press SPACE to Restart', p.width / 2, p.height / 2);
        p.pop();
    }

    const successView = () => {
        
                if (!successSoundPlayed && soundActive) {
                        successSound.setVolume(0.1);
                        successSound.play();
                        successSoundPlayed = true;
                }
        p.push();
            p.background('#8CBA80')
            p.textSize(50);
            p.fill('#514663')
            p.text('You won :)', 200, p.height / 2);
            p.textSize(20)
            p.text('Press SPACE to play again', 200, 450);
        p.pop();
    }

    const startView = () => {
        p.push();
            p.background('#658E9C')
            p.textSize(32);
            p.fill(0);
            p.text('Press SPACE to start', 150, p.height / 2);
        p.pop();
    }

    const playView = () => {
        p.background('#514663');
        const done = enemies.intersect(ball);
        if(done) {
            state = 'success';
            successSoundPlayed = false; // allow sound on next win
        }
        enemies.display();
        
        player.intersects(ball);
        player.update();
        player.display();

        ball.update();
        lives = ball.detectBottom();
        ball.display();

        (lives === 1) ? p.fill(255,0,0) : p.fill(255);
        p.text(`Lives: ${lives}`, 10, p.height - 20);

        if(lives <= 0) {
            state = 'gameover';
        }
    }

};

export default sketch;