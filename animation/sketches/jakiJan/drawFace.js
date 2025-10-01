
    

    
    const drawFace = (p, {skinColor, eyeColor, outline}) => {
        p.push();
            p.translate(p.width*0.6,40);
            p.rotate(p.PI*0.4);
            p.push();
                
                // J
                p.line(35,0, -30, 0);
                
                p.beginShape();
                    p.curveVertex(20,0);
                    p.curveVertex(30,0);
                    p.curveVertex(30,100);
                    p.curveVertex(-30,100);
        
                    p.curveVertex(30,100);
                    p.curveVertex(30,0);
                p.endShape();

                p.push();
                    p.stroke(0,0,0,50)
                    p.translate(10,10);
                    p.beginShape();
                        p.curveVertex(30,0);
                        p.curveVertex(30,5);
                        p.curveVertex(30,100);
                        p.curveVertex(-30,100);
            
                        p.curveVertex(30,100);
                        p.curveVertex(30,0);
                    p.endShape();
                p.pop();
                
                // Big eye
                //p.noStroke();
                p.fill(eyeColor)
                p.circle(-5,60, 60);

                // small eye
                p.circle(0,-50, 35);
                p.noFill();
                p.stroke(0,0,0,50)
                p.arc(0, -50, 60, 60, p.PI/2 + p.PI, p.PI/4);
            p.pop();
            
            // A
            p.push();
                p.translate(100,0);
               
                p.beginShape();
                    p.vertex(30,0);
                    p.vertex(0,100);
                    p.vertex(-25,0);
                p.endShape();
            p.pop()

            // N
            p.push();
                p.translate(170,-60);
                p.push();
                    p.beginShape();
                        //p.vertex(-50,100);
                        p.fill(skinColor)
                        p.rotate(p.map(p.sin(p.frameCount * 0.01), -1, 1, -.5, -.3));
                        p.vertex(0,0);
                        p.vertex(130,130);
                        p.vertex(130,0);
                        
                    p.endShape();
                p.pop();
                
                // teeth
                p.push();
                    p.translate(0,0);
                    p.rotate(p.HALF_PI);
                    const topLip = {
                        x: 0,
                        y: 0,
                        w: 150
                    }
                    
                    const teethHeight = 40;
                    const teethAmount = 5;
                    p.fill('#fff');
                    p.beginShape();
                        const teethWidth = topLip.w / teethAmount;
                        for(let currentTeeth = 0; currentTeeth <= teethAmount*2; currentTeeth++){
                            const x = topLip.x + (teethWidth/2 * currentTeeth);
                            const y = topLip.y + (-teethHeight * (currentTeeth/teethAmount) * (currentTeeth % 2));
                            p.vertex(x,y);
                        
                        }
                    p.endShape(p.CLOSE);
                    p.strokeWeight(15);
                    p.line(topLip.x,topLip.y,topLip.x + topLip.w,topLip.y);
                    
                p.pop()
            p.pop();
        p.pop();
    }

    export default drawFace;