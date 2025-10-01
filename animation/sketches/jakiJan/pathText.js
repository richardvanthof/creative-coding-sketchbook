// text following curve: https://editor.p5js.org/MichaelPaulukonis/sketches/Reg-I-mkS

const textPath = ({
    pathData,
    textString,
    minFontSize = 10,
    maxFontSize = 100,
    color = 0
},p) => {
    const message = textString.toUpperCase().split("").reverse();
    const charCount = message.length;
    // p.strokeWeight(50);
    // p.stroke(0,0,0,40)
    // p.bezier(...pathData.flat());
    p.stroke(0);
    p.strokeWeight(2);
    // destructure bezier points
    const [x1, y1, x2, y2, x3, y3, x4, y4] = pathData.flat();

    // draw each character moving along the bezier
    p.textSize(40);
    p.textAlign(p.CENTER, p.CENTER);
    var step0 = p.frameCount * 0.002;

    for (let i = 0; i < charCount; i++) {
        const current = message[i];
       // linear parameter avoids clustering: t = i/(n-1)
            const baseT = charCount > 1 ? i / (charCount - 1) : 0;
            // optional small animation offset:
            const t = (baseT + step0) % 1.0;
        // const t = charCount > 1 ? i / (charCount - 1) : 0;
        //console.log(t);
        const cx = p.bezierPoint(x1, x2, x3, x4, t);
        const cy = p.bezierPoint(y1, y2, y3, y4, t);
        const tx = -p.bezierTangent(x1, x2, x3, x4, t);
        const ty = -p.bezierTangent(y1, y2, y3, y4, t);
        const angle = p.atan2(ty, tx);

        p.push();
            p.translate(cx, cy);
            p.rotate(angle);
            p.fill(color + '80');
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(p.map(t, 0,1, minFontSize,maxFontSize));
            p.text(current, 0, 0);
        p.pop();
        
    }
        
}

export default textPath;