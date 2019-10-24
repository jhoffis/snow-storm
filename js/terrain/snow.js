"use strict";

// import {Geometry, Vector3, Points, PointsMaterial} from "../lib/three.module.js";
import  {TextureLoader, PlaneBufferGeometry, MeshLambertMaterial, Mesh} from "../lib/three.module.js";

export default class Snow {
    constructor(terrainWidth, scene) {
        let loader = new TextureLoader();
        let snowTemp = [];
        loader.load("res/textures/snow.png",function(texture) {
            let snowGeo = new PlaneBufferGeometry(1, 1);
            let snowMaterial = new MeshLambertMaterial({
                map: texture,
                transparent: true
            });
            for (let p = 0; p < 2000; p++) {
                let snow = new Mesh(snowGeo, snowMaterial);
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

    fall(speed, pointTowards) {

        this.snows.forEach(p => {

            // p.rotation.x = ( p.rotation.y * pointTowards.position.z - p.rotation.z * pointTowards.position.y);
            // p.rotation.y = ( p.rotation.z * pointTowards.position.x - p.rotation.x * pointTowards.position.z);
            // p.rotation.z = ( p.rotation.x * pointTowards.position.y - p.rotation.y * pointTowards.position.x);

            // p.rotateTowards()

            p.velocity = - 0.5 + Math.random() * 0.1;
            p.position.y += p.velocity;
            if (p.position.y < 0 && Math.random() > 0.97) {
                p.position.y = 40;
                p.velocity = 0;
            }
        });
        // this.rainGeo.verticesNeedUpdate = true;
        // this.rain.rotation.y += 0.00002;
    }

    stopFall() {

    }
}
