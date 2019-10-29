"use strict";

class ExternalObject {

    constructor(scene, url, size, posX, posY, posZ) {

        let loader = new THREE.GLTFLoader();
        let newObj;

        this.object = function (gltf) {

            this.model = gltf.scene;
            if (size === undefined) {
                size = 10;
            }
            this.model.scale.x = size;
            this.model.scale.y = size;
            this.model.scale.z = size;
            console.log(posX, posY, posZ)
            if (posX !== undefined && posY !== undefined && posZ !== undefined) {
                this.model.position.set(posX, posY, posZ);
            }
            else{
                this.model.position.set(0, 0, 0);
            }
            this.x = this.model;
            scene.add(this.model);
            console.log(this.model)
            console.log(size)

        };

        loader.load(url, this.object);


    }

    changePosition (posX, posY, posZ){
        if(this.object.model != null) {
            this.object.model.position.set(posX, posY, posZ);

            console.log(this.object)
        }
    }

}