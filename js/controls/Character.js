"use strict";

class Character {

    constructor() {
        const cameraFOV = 75;
        this.camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        ;
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

        this.gun = new ExternalObject(this.camera, 'res/models/gun.gltf');
        this.standardGunPosition = new THREE.Vector3(0.5, -0.3, -1)
        this.gunMoveAmount = 0.0;
        this.gunMoveDirection = 1;
        this.gun.position.set(this.standardGunPosition.x, this.standardGunPosition.y, this.standardGunPosition.z)
        this.gunPlaced = false;

        this.standardGunRotation = new THREE.Vector3(0, -0.2, Math.PI)
        this.gun.rotation.set(this.standardGunRotation.x, this.standardGunRotation.y, this.standardGunRotation.z);
        this.gunShootAmount = 0;
        this.shooting = false;

        let loader = new THREE.TextureLoader();
        let parent = this;
        loader.load("res/textures/gunflash.png", function (texture) {

            let gunflashMaterial = new THREE.SpriteMaterial({
                map: texture, color: 0xffffff,
                transparent: true
            });

            parent.gunflash = new THREE.Sprite(gunflashMaterial);
            parent.gunflash.position.set(
                0,
                0,
                -1
            );
            parent.gunflash.material.opacity = 0;
            parent.gun.add(parent.gunflash);
        });

        loader.load("res/textures/crosshair.png", function (texture) {

            texture.magFilter = THREE.NearestFilter;

            let crosshairMaterial = new THREE.SpriteMaterial({
                map: texture, color: 0xffffff,
                transparent: true
            });

            let crosshair = new THREE.Sprite(crosshairMaterial);
            crosshair.position.set(
                0,
                0,
                -0.1
            );
            let scale = 0.005
            crosshair.scale.set(scale, scale, scale)
            parent.camera.add(crosshair);
        });


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

        if (this.shooting) {

            this.gunShootAmount += moveSpeed * 2;
            this.gun.rotation.x = this.standardGunRotation.x - 0.4 * Math.pow(this.gunShootAmount, 2) + 0.4 * this.gunShootAmount;

            if (this.gun.rotation.x < this.standardGunRotation.x) {
                this.gun.rotation.set(this.standardGunRotation.x, this.standardGunRotation.y, this.standardGunRotation.z);
                this.gunShootAmount = 0;
                this.shooting = false
            this.gunflash.material.opacity = 0;
            }
        }

        if (this.move.run) {
            moveSpeed = moveSpeed * 2;
        }

        let movement = false;

        if (this.move.left) {
            this.velocity.x -= moveSpeed;
            movement = true;
        }

        if (this.move.right) {
            this.velocity.x += moveSpeed;
            movement = true;
        }

        if (this.move.forward) {
            this.velocity.z -= moveSpeed;
            movement = true;
        }

        if (this.move.backward) {
            this.velocity.z += moveSpeed;
            movement = true;
        }

        if (movement) {
            if (this.gunPlaced)
                this.gunPlaced = false;

            let speed = moveSpeed / 2.2;
            if (this.gunMoveDirection !== 1) {
                speed = -speed;
            }

            this.gunMoveAmount += speed;

            if (this.gunMoveAmount > 1) {
                this.gunMoveAmount = 1;
                this.gunMoveDirection = 0
            } else if (this.gunMoveAmount < 0) {
                this.gunMoveAmount = 0;
                this.gunMoveDirection = 1;
            }

            this.gun.position.set(this.standardGunPosition.x - 0.2 * this.gunMoveAmount,
                0.4 * Math.pow(this.gunMoveAmount, 2) - 0.4 * this.gunMoveAmount + this.standardGunPosition.y,
                this.standardGunPosition.z)

        } else if (!this.gunPlaced) {
            //Reset gun movement
            this.gun.position.set(this.standardGunPosition.x, this.standardGunPosition.y, this.standardGunPosition.z)
            this.gunMoveAmount = 0;
            this.gunMoveDirection = 1
            this.gunPlaced = true;

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

    get characterheight() {
        return this.camera.position.y;
    }


    shoot() {
        this.gun.rotation.set(this.standardGunRotation.x, this.standardGunRotation.y, this.standardGunRotation.z);
        this.gunShootAmount = 0;
        this.shooting = true;
        this.gunflash.material.opacity = 0.9
    }

}