"use strict";

class Shark{

    xPositive = 0;
    xNegative = 0;

    constructor(scene) {
        let parent = this;

        this.object = new ExternalObject(scene, 'res/models/shark/scene.gltf', 1, -40, 4, 30,
            function s() {
                parent.mixer = new THREE.AnimationMixer(parent.object.gltf.scene);
                parent.object.gltf.animations.forEach((clip) => {
                    let clipAction = parent.mixer.clipAction(clip)
                    clipAction.play();
                });
            }
        );
    }
    //95, 0.25
sharkMove(setDistance, speed) {
        if (this.xPositive <  setDistance){

                this.object.position.x = this.object.position.x + speed
                this.xPositive = this.xPositive+speed


            if (this.xPositive < 1) {
               this.object.rotate(0, Math.PI/2, 0)
            }
            //Dive
            if (this.object.position.x <-24 && this.object.position.x > -29) {
                this.object.position.y = this.object.position.y + speed
            }


        }else if(this.xNegative < setDistance){
                this.object.position.x = this.object.position.x - speed;
        this.xNegative = this.xNegative+speed;

            if (this.xNegative < 1) {
                this.object.rotate(0, Math.PI+(Math.PI/2), 0)
            }
            //Undive
            if (this.object.position.x <-24 && this.object.position.x > -29) {
                this.object.position.y = this.object.position.y -speed;
            }
           }
        else {
            //Start over again
            this.xPositive = 0;
            this.xNegative = 0
        }




    //console.log(this.object.position.x)
}

}