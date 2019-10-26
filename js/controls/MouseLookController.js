class MouseLookController {

    constructor(camera) {
        
        this.camera = camera;

        this.FD = new THREE.Vector3(0, 0, 1);
        this.UD = new THREE.Vector3(0, 1, 0);
        this.LD = new THREE.Vector3(1, 0, 0);

        this.pitchQuaternion = new THREE.Quaternion();
        this.yawQuaternion = new THREE.Quaternion();

    }

    update(pitch, yaw) {
        
        this.pitchQuaternion.setFromAxisAngle(this.LD, -pitch);
        this.yawQuaternion.setFromAxisAngle(this.UD, -yaw);

        this.camera.setRotationFromQuaternion(this.yawQuaternion.multiply(this.camera.quaternion.multiply(this.pitchQuaternion)));

    }
    
}