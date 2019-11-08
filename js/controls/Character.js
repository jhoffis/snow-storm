"use strict";

class Character {

    constructor() {
        const cameraFOV = 75;
        this.camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.add(this.camera)
        this.freecam = false;
        this.velocity = new THREE.Vector3(0.0, 0.0, 0.0);
        this.move = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
            run: false,
            speed: 0.007
        };

        this.gun = new ExternalObject(this.camera,'res/models/gun.gltf');
        this.gun.addPosition(new THREE.Vector3(0, 0, -10))

        this.fall = 0;
        this.jump = 0;

        this.mouseLookController = new MouseLookController(this.camera);

    }

    freeCam() {
        this.freecam = !this.freecam;
    }

    movement(delta) {
        let moveSpeed = this.move.speed * delta;

        this.velocity.set(0.0, 0.0, 0.0);

        if (this.freecam) {
            if (this.move.up) {
                this.velocity.y += moveSpeed;
            }
            if (this.move.down) {
                this.velocity.y -= moveSpeed;
            }
        } else {
            // if (this.move.up) {
            //     this.velocity.y += moveSpeed;
            // }
            // if (this.move.down) {
            //     this.velocity.y -= moveSpeed;
            // }

        }
        if(this.move.run){
            moveSpeed = moveSpeed * 2;
        }
        if (this.move.left) {
            this.velocity.x -= moveSpeed;
        }

        if (this.move.right) {
            this.velocity.x += moveSpeed;
        }

        if (this.move.forward) {
            this.velocity.z -= moveSpeed;
        }

        if (this.move.backward) {
            this.velocity.z += moveSpeed;
        }


        this.velocity.applyQuaternion(this.camera.quaternion);
        this.camera.position.add(this.velocity);

        if (terrainGeometry != null && !this.freecam) {
            let heightCam = terrainGeometry.getHeightAtPrecise(this.camera.position.clone());
            if (heightCam < 200)
                this.camera.position.y = heightCam + 2;
        }


        // this.gun.position(this.camera.position.x, this.camera.position.y, this.camera.position.z)
        // this.gun.rotate(this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z)
        // var cx, cy, cz, lx, ly, lz;
        //
        // dir.set(0,0,-1);
        // dir.applyAxisAngle(0,camera.rotation.x);
        // dir.applyAxisAngle(1,camera.rotation.y);
        // dir.applyAxisAngle(2,camera.rotation.z);
        // var dist = 100;
        //
        // let cx = this.camera.position.x;
        // let cy = this.camera.position.y;
        // let cz = this.camera.position.z;
        //
        // let lx = dir.x;
        // let ly = dir.y;
        // let lz = dir.z;
        //
        //
        // var l;
        //
        // l = Math.sqrt((dist*dist)/(lx*lx+ly*ly+lz*lz));
        //
        // var x1, x2;
        // var y1, y2;
        // var z1, z2;
        //
        // x1 = cx + lx*l;
        // x2 = cx - lx*l;
        //
        // y1 = cy + ly*l;
        // y2 = cy - ly*l;
        //
        // z1 = cz + lz*l;
        // z2 = cz - lz*l;
        //
        //
        // nanobot.position.set(x1, y1, z1 );

    }

    get characterheight(){
        return this.camera.position.y;
    }


}