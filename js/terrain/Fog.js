"use strict";

class Fog {

    constructor(water) {
        this.near = 10;
        this.far = 40;
        this.charHeight = character.characterheight;
        this.uwnear = 2;
        this.uwfar = 10;
    }

    change(scene, character) {
        this.charHeight = character.characterheight;
        scene.fog = this.getFog();
    }


    getFog() {
        let fog;

        if (ice != null && this.charHeight > ice.waterHeight) {
            // Fog for above waterlevel
            fog = new THREE.Fog(0xD6D7D2, this.near, this.far);
        } else {
            // Fog for the "waterfog"
            fog = new THREE.Fog(0x75c7d2, this.uwnear, this.uwfar);
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
