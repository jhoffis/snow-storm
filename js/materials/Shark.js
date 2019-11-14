"use strict";

class Shark{

    constructor(scene) {
        let parent = this;
        this.object = new ExternalObject(scene, 'res/models/shark/scene.gltf', 1, 1, 1, 1,
            function s() {
                parent.mixer = new THREE.AnimationMixer(object.gltf.scene);
                parent.object.gltf.animations.forEach((clip) => {
                    let clipAction = parent.mixer.clipAction(clip)
                    clipAction.play();
                });
            }
        );
        
        //var delta = clock.getDelta();
        // mixer.update( delta )

    }


}