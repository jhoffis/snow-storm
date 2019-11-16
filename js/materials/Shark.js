"use strict";

class Shark{

    xPositive = 0;
    xNegative = 0;

    constructor(scene) {
        let parent = this;

        this.object = new ExternalObject(scene, 'res/models/shark/scene.gltf', 1, 1, 9, 30,
            function s() {
                parent.mixer = new THREE.AnimationMixer(parent.object.gltf.scene);
                parent.object.gltf.animations.forEach((clip) => {
                    let clipAction = parent.mixer.clipAction(clip)
                    clipAction.play();
                });



            }
        );


    }
sharkMove (){
     //let posX = this.object.position.x


//console.log(xPos)
        if (this.xPositive <  45){

                this.object.position.z = this.object.position.z + 1
                this.xPositive = this.xPositive+1


            if (this.xPositive > 44) {
               this.object.rotate(0, 3.14, 0)
                console.log("Positive")
            }



        }else if(this.xNegative < 45){
                this.object.position.z = this.object.position.z - 1
        this.xNegative = this.xNegative+1

            if (this.xNegative > 44) {
                this.object.rotate(0, 0, 0)
                console.log("MINUS")
            }
            }
        else {
            this.xPositive = 0;
            this.xNegative = 0
        }




    //console.log(this.object.position.x)
}

}