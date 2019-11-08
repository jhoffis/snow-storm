"use strict";
class Fog{
    constructor(character, water){
        let fog = null;
        let waterHeight = 10;
        if (character.characterheight > waterHeight){
            fog = new THREE.FogExp2(0xD6D7D2, 0.025);
        } else {
            fog = new THREE.FogExp2(0x3475E9, 0.25);
            /*
            Other possible colors:
            2ABCB2
            4094FF
            3475E9
             */
        }
        return fog;

    }
}