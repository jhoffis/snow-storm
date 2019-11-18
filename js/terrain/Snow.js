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
            for (let p = 0; p < 1000; p++) {
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

    }

    fall(speed, camera) {

        this.snows.forEach(p => {

            p.lookAt(camera.position);
            p.velocity = -0.1 + Math.random() * 0.1;
            p.position.y += p.velocity;
            if (p.position.y < 0 && Math.random() > 0.97) {
                p.position.y = 40;
                p.velocity = 0;
            }

        });
    }

}
