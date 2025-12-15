class CanvasControls {
    /**
     * @param {p5} p 
     * @param {number} w Initial canvas width
     * @param {number} h Initial canvas height
     */
    constructor(p, w = 400, h = 400) {
        this.p = p;
        this.zoom = 1;
        this.baseZoomDist = 500;
        this.camPos = this.p.createVector(0, 0, this.baseZoomDist);
        this.targetPos = this.p.createVector(0, 0, 0);
        this.camera = this.p.createCamera();
        this.handlersBound = false;
        this.setCamera(this.camPos.x, this.camPos.y, this.camPos.z);
        this.setBaseZoom(w, h);
    }

    /**
     * Set the base zoom height of the camera based on the canvas size.
     * AKA. how far the camera is from the center pointin pixels.
     * @param {number} amount 
     */
    setBaseZoom(width, height) {
        const fov = this.camera?.fov ?? this.p.PI / 3;
        const aspect = this.p.width / this.p.height;
        const halfW = width / 2;
        const halfH = height / 2;
        const tanHalfFov = Math.tan(fov / 2);
        const distForHeight = halfH / tanHalfFov;
        const distForWidth = halfW / (tanHalfFov * aspect);
        this.baseZoomDist = Math.max(distForHeight, distForWidth);

        this.zoom = Math.max(width, height) / this.baseZoomDist;
        this.updateCameraPosition();
    }

    /**
     * Hangle zooming
     * @param {number} delta 
     * @returns 
     */

    setCamera(x,y,z) {
        this.camera?.setPosition(x, y, z);
        this.camera?.lookAt(this.targetPos.x, this.targetPos.y, this.targetPos.z);
    }

    handleZoom(delta) {
        if (!this.camera || !this.camPos || !this.targetPos) {
            return;
        }
        const zoomAmount = delta * -0.001;
        this.zoom += zoomAmount;
        this.zoom = this.p.constrain(this.zoom, 0.05, 50);
        this.updateCameraPosition();
    };

    /**Set relative zoom amount; 100% = 1 */
    setZoom(zoom) {
        this.zoom = this.p.constrain(zoom, 0.05, 50);
        this.updateCameraPosition();
    }

    /**
     * Handle panning around the canvas
     * @param {number} deltaX 
     * @param {number} deltaY 
     */
    handlePan(deltaX, deltaY) {
     
        const panSpeed = 1 / this.zoom;
        const moveX = deltaX * panSpeed;
        const moveY = deltaY * panSpeed;
        this.camPos.x -= moveX;
        this.camPos.y -= moveY;
        this.targetPos.x -= moveX;
        this.targetPos.y -= moveY;
        if (!this.camera) {
            return;
        }
        this.camera.setPosition(this.camPos.x, this.camPos.y, this.camPos.z);
        this.camera.lookAt(this.targetPos.x, this.targetPos.y, this.targetPos.z);
    }

    update(p) {
        // change cursor based on key pressed

        if(p.keyIsDown(32)) { // Space key
            p.cursor('grab');
        } else {
            p.cursor('default');
        }

        if (this.handlersBound) {
            return;
        }

        p.mouseWheel = (e) => {
            if(p.keyIsDown(17)){ // Ctrl key
                this.handleZoom(e.delta);
            }
            
            return false;
        };

        p.mouseDragged = (e) => {
            // Pan when SPACE is pressed
            if(p.keyIsDown(32)){
                this.handlePan(e.movementX, e.movementY);
            }
            return false;
        };

        p.touchMoved = () => {
            if (p.touches.length !== 1) {
                return true;
            }
            this.handlePan(p.mouseX - p.pmouseX, p.mouseY - p.pmouseY);
            return false;
        }; 

        this.handlersBound = true;
    };

    updateCameraPosition() {
        if (!this.camPos) {
            return;
        }
        this.camPos.z = this.baseZoomDist / this.zoom;
        this.setCamera(this.camPos.x, this.camPos.y, this.camPos.z);
    }
    
};

export default CanvasControls;