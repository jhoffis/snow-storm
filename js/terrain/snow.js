"use strict";

import {Geometry, Points, PointsMaterial, Vector3} from "../lib/three.module.js";

export default class Snow {
    constructor(terrainWidth, scene) {
        // create the particle variables
        let particleCount = 1800,
            particles = new Geometry(),
            pMaterial = new PointsMaterial({
                color: 0xFFFFFF,
                size: 1
            });

        // now create the individual particles
        for (let p = 0; p < particleCount; p++) {

            // create a particle with random
            // position values, -250 -> 250
            let pX = Math.random() * terrainWidth - terrainWidth / 2,
                pY = Math.random() * terrainWidth - terrainWidth / 2,
                pZ = Math.random() * terrainWidth - terrainWidth / 2,
                particle = new Vector3(pX, pY, pZ)


            // add it to the geometry
            particles.vertices.push(particle);
        }

        // create the particle system
        let particleSystem = new Points(
            particles,
            pMaterial);

        // add it to the scene
        scene.add(particleSystem);
    }

    startFall(speed){

    }

    stopFall(){

    }
}
