"use strict";
class bullets {

    constructor() {
        const cameraFOV = 75;
        this.camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.freecam = false;
        this.velocity = new THREE.Vector3(0.0, 0.0, 0.0);

        let bullet = new THREE.Mesh( new THREE.SphereGeometry(0.05, 18, 18),
            new THREE.MeshBasicMaterial({color:0xffffff})
        );
        bullet.position.set(this.camera.position.x + 0.1, this.camera.position.y, this.camera.position.z)

        bullet.alive = true;
        setTimeout(function(){
            bullet.alive = false;
            scene.remove(bullet)
        }, 1000);
        scene.add(bullet)



    }
}