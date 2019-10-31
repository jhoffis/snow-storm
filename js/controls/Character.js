"use strict";

class Character {

    constructor() {
        const cameraFOV = 75;
        this.camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.freecam = false;
        this.velocity = new THREE.Vector3(0.0, 0.0, 0.0);

        this.move = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            speed: 0.01
        };

        this.gun = new ExternalObject(scene, 'res/models/gun.gltf');

        this.mouseLookController = new MouseLookController(this.camera);

    }

    freeCam() {
        this.freecam = !this.freecam;
    }

    movement(delta) {
        const moveSpeed = this.move.speed * delta;

        this.velocity.set(0.0, 0.0, 0.0);

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

        if (terrainGeometry != null && this.freecam === false) {
            let heightCam = terrainGeometry.getHeightAtPrecise(this.camera.position.clone());
            if (heightCam < 200)
                this.camera.position.y = heightCam + 2;
        }

        this.gun.position(this.camera.position.x + 0.1, this.camera.position.y, this.camera.position.z)
        this.gun.rotate(this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z)
    }


}