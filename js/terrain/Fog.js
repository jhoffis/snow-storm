"use strict";

class Fog {
    constructor(character, water) {
        let fog = null;
        if (character.characterheight > water.waterHeight) {
            // Fog for above waterlevel
            fog = new THREE.FogExp2(0xD6D7D2, 0.025);
        } else {
            // Fog for the "waterfog"
            fog = new THREE.FogExp2(0x75c7d2, 0.15);
            /*
            Other possible colors:
            2ABCB2
            4094FF
            3475E9
            61a9e8
            75c7bd
            75c7d2
             */
        }
        return fog;

    }
}
