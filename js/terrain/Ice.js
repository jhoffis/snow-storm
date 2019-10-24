"use strict";

import {PlaneBufferGeometry} from "../lib/three.module.js";
import { Water } from '../lib/Water.js';
export default class Ice {

    constructor(terrainWidth, scene){
        var waterGeometry = new PlaneBufferGeometry(terrainWidth, terrainWidth);
        let water = new Water(waterGeometry, {
            color: 0xFF0000,
            scale: 4,
            textureWidth: 1024,
            textureHeight: 1024
        });
        water.position.y = 20;
        water.rotation.x = Math.PI * - 0.5;
        scene.add(water);
    }
}