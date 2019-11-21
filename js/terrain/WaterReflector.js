"use strict";

class WaterReflector {


    constructor(terrainWidth, scene) {
        this.waterHeight = 10;
        let waterSize = 2000;
        let waterGeometry = new THREE.PlaneBufferGeometry(terrainWidth*2, terrainWidth*2);
        let water = new Water_S(waterGeometry, {
            color: 0x9DF2DB, //9DF2DB og ffffff
            scale: 8,
            textureWidth: 1024,
            textureHeight: 1024,
            flowSpeed: 0.01
        });
        water.position.y = this.waterHeight;
        water.rotation.x = Math.PI * -0.5;
        scene.add(water);

    }

}