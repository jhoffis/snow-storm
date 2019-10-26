"use strict";

class ExternalObject {
    constructor(scene, url) {

        let loader = new THREE.GLTFLoader();

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