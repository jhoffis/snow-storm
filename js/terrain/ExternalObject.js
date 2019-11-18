"use strict";

class ExternalObject extends THREE.Group {

    constructor(scene, url, size, posX, posY, posZ, actionFunc) {
        super();

        if (scene != null)
            scene.add(this);

        let parent = this;

        if(typeof url === 'string') {
            let loader = new THREE.GLTFLoader();
            loader.load(url, function (gltf) {

                parent.add(gltf.scene);
                parent.gltf = gltf;
                parent.resize(size);
                parent.position.set(posX, posY, posZ);

                if (typeof actionFunc === "function") {
                    actionFunc();
                } else {
                    console.log("THERE IS NO ACTION FUNCTION USING: " + url)
                }
            }, undefined, function (error) {
                console.error(error);
            });
        } else {
            this.gltf = url;
            this.add(url.scene.clone());
            this.resize(size);
            this.position.set(posX, posY, posZ);

        }

    }

    resize(size) {
        if (size != null) {
            this.scale.x = size
            this.scale.y = size
            this.scale.z = size
        }
    }

    //
    // position(posX, posY, posZ) {
    //     if (posX != null && posY != null && posZ != null) {
    //         this.object.position.set(posX, posY, posZ);
    //     }
    //
    // }
    //
    // addPosition(velo){
    //     if (velo != null) {
    //         this.object.position.x += velo.x;
    //         this.object.position.y += velo.y;
    //         this.object.position.z += velo.z;
    //     }
    // }
    //
    rotate(x, y, z) {
        if (x != null && y != null && z != null) {
            this.rotation.set(x, y, z);
        }
    }

}