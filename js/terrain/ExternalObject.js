"use strict";
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/examples/jsm/loaders/GLTFLoader.js';

export default class ExternalObject {
    constructor(scene, url) {

        let loader = new GLTFLoader();

        loader.load(url, function (gltf) {

            const root = gltf.scene;
            root.scale.x = 10;
            root.scale.y = 10;
            root.scale.z = 10;
            scene.add(root);
            console.log(root)

        }, undefined, function (error) {
            console.error(error);
        });
    }

}