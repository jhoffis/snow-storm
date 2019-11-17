"use strict";

class Shark{

    xPositive = 0;
    xNegative = 0;

    constructor(scene) {
        let parent = this;

        this.object = new ExternalObject(scene, 'res/models/shark/scene.gltf', 1, -40, 9, 30,
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
        if (this.xPositive <  95){

                this.object.position.x = this.object.position.x + 1
                this.xPositive = this.xPositive+1


            if (this.xPositive < 2) {
               this.object.rotate(0, 1.57, 0)
                console.log("Positive")
            }



        }else if(this.xNegative < 95){
                this.object.position.x = this.object.position.x - 1
        this.xNegative = this.xNegative+1

            if (this.xNegative < 2) {
                this.object.rotate(0, 4.71, 0)
                console.log("MINUS")
            }
            }
        else {
            this.xPositive = 0;
            this.xNegative = 0
        }




    console.log(this.object.position.x)
}

}