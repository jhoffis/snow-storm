"use strict";

class Fog {
    constructor(character, water) {
        let fog = null;
        const near = 20;
        const far = 40;
        const uwnear = 2;
        const uwfar = 10;

        if (character.characterheight > water.waterHeight) {
            // Fog for above waterlevel
            fog = new THREE.Fog(0xD6D7D2, near, far);
        } else {
            // Fog for the "waterfog"
            fog = new THREE.Fog(0x75c7d2, uwnear, uwfar);
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
