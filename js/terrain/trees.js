"use strict";

import {BoxGeometry, MeshBasicMaterial, Points, Vector3} from "../lib/three.module.js";
import TerrainBufferGeometry from "./TerrainBufferGeometry.js";

export default class Trees {
    constructor(terrain, terrainWidth, scene) {
        //creating tree variable, with 100 trees
        let treeCount = 100,
            treeGeometry = new BoxGeometry(1, 3, 1),
            treeMaterial = new MeshBasicMaterial({color: 0xff0000})
        //creating each individual tree
        for (let i = 0; i < treeCount; i++) {
            let pX = Math.random() * terrainWidth - terrainWidth/2,
                pZ = Math.random() * terrainWidth - terrainWidth/2,
                pY = terrain.getHeightAtPrecise(new Vector3(pX, 0, pZ)),
                tree = new Vector3(pX, pY, pZ);

            //pushing trees to the geometry
            treeGeometry.vertices.push(tree);
        }

        let treeSystem = new Points(
            treeGeometry,
            treeMaterial
        );

        scene.add(treeSystem);
    }


}