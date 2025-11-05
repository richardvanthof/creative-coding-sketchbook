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

        if(state === 'playing') {
            const done = enemies.intersect(ball);
            if(done) {
                state = 'success';
            }
            enemies.update();
            enemies.display();
            
            player.intersects(ball);
            player.update();
            player.display();
    
            ball.update();
            lives = ball.detectBottom();
            ball.display();

            p.fill(255,0,0)
            p.text(`Lives: ${lives}`, 10, p.height - 20);

            if(lives <= 0) {
                state = 'gameover';
            }
        } else if(state === 'gameover') {
            p.push()
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(32);
                p.fill(0);
                p.text('Game Over! Press SPACE to Restart', p.width / 2, p.height / 2);
            p.pop();
        }
        else if(state === 'success') {
            p.push();
                p.textSize(50)
                p.text('You won :)', 200, p.height / 2);
                p.textSize(20)
                 p.text('Press SPACE to play again', 200, 450);
            p.pop();
        
        } else {
            p.push();
                p.textSize(32);
                p.fill(0);
                p.text('Press SPACE to start', 150, p.height / 2);
            p.pop();
        }

    };

    p.keyPressed = () => {
        if (state !== 'playing' && p.key === ' ') {
            restart();
        }
    };

    p.mousePressed = () => {
        enemies.getTargets();
        console.log(enemies.targets);
    }

    const restart = () => {
        ball.reset();
        enemies.reset();
        
        lives = ball.lives;
        state = 'playing';
    }

};

export default sketch;