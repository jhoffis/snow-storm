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

                parent.runAction(actionFunc)
            }, undefined, function (error) {
                console.error(error);
            });
        } else {
            this.gltf = url;
            this.add(url.scene.clone());
            this.resize(size);
            this.position.set(posX, posY, posZ);
            this.runAction(actionFunc)
        }

    }

    runAction(actionFunc){
        if (typeof actionFunc === "function") {
            actionFunc();
        } else {
            console.log("THERE IS NO ACTION FUNCTION USING: " + this)
        }
    }

    resize(size) {
        if (size != null) {
            this.scale.x = size
            this.scale.y = size
            this.scale.z = size
        }
    }

    rotate(x, y, z) {
        if (x != null && y != null && z != null) {
            this.rotation.set(x, y, z);
        }
    }

}