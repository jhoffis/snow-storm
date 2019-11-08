"use strict";

class ExternalObject{

    constructor(scene, url, size, posX, posY, posZ) {

        this.object = new THREE.Group();
        scene.add(this.object);

        let parent = this;

        let loader = new THREE.GLTFLoader();
        loader.load(url, function (gltf) {

            parent.object.add(gltf.scene);
            parent.resize(size);
            parent.position(posX, posY, posZ);

        }, undefined, function (error) {
            console.error(error);
        });

    }

    resize(size) {
        if (size != null) {
            this.object.scale.x = size
            this.object.scale.y = size
            this.object.scale.z = size
        }
    }

    position(posX, posY, posZ) {
        if (posX != null && posY != null && posZ != null) {
            this.object.position.set(posX, posY, posZ);
        }

    }

    addPosition(velo){
        if (velo != null) {
            this.object.position.x += velo.x;
            this.object.position.y += velo.y;
            this.object.position.z += velo.z;
        }
    }

    rotate(x, y, z){
        if (x != null && y != null && z != null) {
            this.object.rotation.set(x, y, z);
        }
    }

}