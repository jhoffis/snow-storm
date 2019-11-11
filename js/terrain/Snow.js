"use strict";

class Snow {
    constructor(terrainWidth, scene) {


        let loader = new THREE.TextureLoader();
        let snowTemp = [];
        loader.load("res/textures/snow.png", function (texture) {

            texture.magFilter = THREE.NearestFilter;

            let snowMaterial = new THREE.SpriteMaterial({
                map: texture, color: 0xffffff,
                transparent: true,
                depthWrite: false
            });
            for (let p = 0; p < 2000; p++) {
                let snow = new THREE.Sprite(snowMaterial);
                snow.position.set(
                    Math.random() * terrainWidth - terrainWidth / 2,
                    Math.random() * 40 + 40,
                    Math.random() * terrainWidth - terrainWidth / 2
                );
                snow.rotation.x = 1.16;
                snow.rotation.y = -0.12;
                snow.rotation.z = Math.random() * 360;
                snow.material.opacity = 0.6;
                snow.velocity = 0;
                scene.add(snow);
                snowTemp.push(snow);
            }
        });

        this.snows = snowTemp;


        // let rainCount = 20000;
        // this.rainGeo = new Geometry();
        // for (let i = 0; i < rainCount; i++) {
        //     let rainDrop = new Vector3(
        //         Math.random() * 400 - 200,
        //         Math.random() * 500 - 250,
        //         Math.random() * 400 - 200
        //     );
        //     console.log(rainDrop)
        //     rainDrop.velocity = {};
        //     rainDrop.velocity = 0;
        //     this.rainGeo.vertices.push(rainDrop);
        // }
        //
        //
        // let rainMaterial = new PointsMaterial({
        //     color: 0x000000,
        //     size: 0.1,
        //     transparent: false
        // });
        // this.rain = new Points(this.rainGeo, rainMaterial);
        // scene.add(this.rain);

    }

    fall(speed, camera) {

        this.snows.forEach(p => {


            camera.updateMatrix();
            camera.updateMatrixWorld();
            let frustum = new THREE.Frustum();
            frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

// Your 3d point to check

            let pCheck = p.position.clone();
            let angle = Math.tan(180 / Math.PI * camera.rotation.y) * 2;
            pCheck.y = camera.position.y + angle;
                // Do something with the position...
                p.lookAt(camera.position);
                // p.rotation.set(pointTowards.rotation., 1, pointTowards.rotation.x);

                p.velocity = -0.1 + Math.random() * 0.1;
                p.position.y += p.velocity;
                if (p.position.y < 0 && Math.random() > 0.97) {
                    p.position.y = 40;
                    p.velocity = 0;
                }

            // p.rotation.x = ( p.rotation.y * pointTowards.position.z - p.rotation.z * pointTowards.position.y);
            // p.rotation.y = ( p.rotation.z * pointTowards.position.x - p.rotation.x * pointTowards.position.z);
            // p.rotation.z = ( p.rotation.x * pointTowards.position.y - p.rotation.y * pointTowards.position.x);

        });
        // this.rainGeo.verticesNeedUpdate = true;
        // this.rain.rotation.y += 0.00002;
    }

    stopFall() {

    }
}
