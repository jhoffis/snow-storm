"use strict";
class Fog{
    constructor(character, water){
        let fog = null;
        let characterHeight = character.camera.position.y;
        let waterHeight = water.position.y;
        if (character.position.y > water.position.y){
            fog = new THREE.fogExp2(0xD6D7D2, 0.0025);

        } else {

            fog = new THREE.fogExp2(0x00000, 1);

        }
        scene.add(fog);

    }
}
