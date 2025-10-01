import drawFace from './drawFace.js';
import pathText from './pathText.js';
/**
 * Jaki = disgusting, unclean, unsanitary, toxic, repulsive, rotten;
 * Jan = Human being, person, somebody;
 */

const colors = {
    skin: '#BBDEF0',
    bg: '#DEEFF7', //
    text: '#908D46',
    eyes: 'white',
    outline: '#435058'
}

const jakiJan = (p) => {

    const path1 = [
        [350,220],
        [30,260],
        [300, 290],
        [0, 0]
    ]
    const path2 = [
        [340,220],
        [100,450],
        [100,200],
        [0, 100]
    ]

    const path3 = [
        [340,250],
        [30,500],
        [200, 300],
        [0, 300]
    ]
    const path4 = [
        [340,300],
        [400,300],
        [200, 300],
        [100, 450]
    ]
    
    const path5 = [
        [3540,100],
        [400,140],
        [200, 300],
        [230, 450]
    ]

    const path6 = [
        [-200,100],
        [50,280],
        [10, 290],
        [20, 400]
    ]
    const paths = [path1, path2, path3, path4, path5, path6];

    let font;
    p.preload = () => {
        font = p.loadFont('assets/SpaceMono/bold.ttf');
    }

    p.setup = () => {
        p.createCanvas(400, 400);
    }

    p.draw = () => {
        p.background(colors.bg);
        p.textFont(font);
        p.textSize(60);
        p.rectMode(p.CENTER);
        
    
        p.textAlign(p.CENTER, p.CENTER);
        
        p.noFill();

        // draw face background shape
        p.push()
            p.fill(colors.skin);
            p.noStroke();
            p.beginShape();
                p.vertex(200, 0);
                p.vertex(p.width, 0);
                p.vertex(p.width, 180);
                p.vertex(p.width, 260);
                p.vertex(320, 200);
                p.vertex(200, 220);
                p.vertex(199, 170);
                p.vertex(125, 50);
                p.vertex(160, 0);
            p.endShape(p.CLOSE);
        p.pop();

        paths.forEach((path, index) => {
            pathText({
                pathData: path,
                textString: "Jaki Jaki Jaki",
                minFontSize: 80,
                maxFontSize: 15,
                color: colors.text
            }, p)
        })
        
        drawFace(p, {
            skinColor: colors.skin,
            eyeColor: colors.eyes,
            outline: colors.outline
        });
    }

}

export default jakiJan;