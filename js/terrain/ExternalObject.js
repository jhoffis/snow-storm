"use strict";

class ExternalObject {

    constructor(scene, url, size) {

        let loader = new THREE.GLTFLoader();
        let newObj;

        loader.load(url, function (gltf) {

            newObj = gltf.scene;
            if (size === undefined) {
                size = 10;
            }
                newObj.scale.x = size;
                newObj.scale.y = size;
                newObj.scale.z = size;

            scene.add(newObj);
            console.log(newObj)
            console.log(size)

        }, undefined, function (error) {
            console.error(error);
        });


        //this.object = newObj;
        //console.log(this.object)
    }
/*
    resize (size){
        this.object.scale.x = size
        this.object.scale.y = size
        this.object.scale.z = size
        console.log(this.object)
    } */

}