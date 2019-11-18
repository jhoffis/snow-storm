"use strict";

class Character {

    constructor() {
        const cameraFOV = 75;
        this.camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(4,0,4);
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
                transparent: true,
                depthWrite: false
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


        this.fall = 0.0;
        this.jump = false;
        this.cannotJumpAgain = false
        this.heightOfCharacter = 2.0
        this.distanceBetweenFeetAndGround = 0.0;
        this.upwardsMotion = 0
        this.upwardsSpeed = 0.18;

        this.mouseLookController = new MouseLookController(this.camera);

    }

    freeCam() {
        this.freecam = !this.freecam;
        if(this.freecam)
            this.move.down = false
    }

    movement(delta, terrainGeometry) {

        if(terrainGeometry == null)
            return;

        let moveSpeed = this.move.speed * delta;
        let charHeight = this.heightOfCharacter;
        let terrainHeightAtCamera = 0;
        let sameHeight = 0;
        let noRunning = false
        this.velocity.set(0.0, 0.0, 0.0);

        if (this.freecam) {
            if (this.move.up) {
                this.velocity.y += moveSpeed;
            }
            if (this.move.down) {
                this.velocity.y -= moveSpeed;
            }
        } else {
            if (terrainGeometry != null)
                terrainHeightAtCamera = terrainGeometry.getHeightAtPrecise(this.camera.position.clone());

            if(this.characterheight < ice.waterHeight){
                moveSpeed = moveSpeed * 2 / 5;
                noRunning = true;
            }


            if (this.move.down) {
                //Croutch
                noRunning = true;
                charHeight = charHeight * 2 / 3;
                moveSpeed = moveSpeed / 2;
            }
            if (this.move.up && !this.cannotJumpAgain) {
                //Jump
                this.jump = true;
                this.cannotJumpAgain = true;
                this.prevTerrainHeightAtCamera = terrainHeightAtCamera;
            }

            if (this.jump) {
                this.upwardsMotion = this.upwardsMotion + this.upwardsSpeed * moveSpeed * 7
                this.upwardsSpeed = this.upwardsSpeed / 3
                this.distanceBetweenFeetAndGround += this.upwardsMotion - this.fall;

                sameHeight = (this.prevTerrainHeightAtCamera - terrainHeightAtCamera);


                if (this.characterheight - charHeight <= terrainHeightAtCamera && this.fall !== 0) {
                    this.cannotJumpAgain = false;
                    this.jump = false;
                    this.distanceBetweenFeetAndGround = 0;
                    this.fall = 0;
                    this.upwardsMotion = 0
                    this.prevTerrainHeightAtCamera = 0
                    this.upwardsSpeed = 0.18;
                } else {
                    this.fall = (0.0016 * moveSpeed * 100 + this.fall)
                }
            }

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

        if (this.move.run && !noRunning) {
            moveSpeed = moveSpeed * 2;
        }

        let bobbing = false;

        if (this.move.left) {
            this.velocity.x -= moveSpeed;
            bobbing = true;
        }

        if (this.move.right) {
            this.velocity.x += moveSpeed;
            bobbing = true;
        }

        if (this.move.forward) {
            this.velocity.z -= moveSpeed;
            bobbing = true;
        }

        if (this.move.backward) {
            this.velocity.z += moveSpeed;
            bobbing = true;
        }

        if (bobbing) {
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

        if (!this.freecam) {
                this.camera.position.y = terrainHeightAtCamera + charHeight + this.distanceBetweenFeetAndGround + sameHeight;
                if (this.characterheight - charHeight < terrainHeightAtCamera) {
                    this.camera.position.y = terrainHeightAtCamera + charHeight
                }
        }

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