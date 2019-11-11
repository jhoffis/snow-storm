var mesh;

// Create an AnimationMixer, and get the list of AnimationClip instances
var mixer = new THREE.AnimationMixer( mesh );
var clips = mesh.animations;

// Update the mixer on each frame
function update () {
    mixer.update( deltaSeconds );
}

// Play a specific animation
var clip = THREE.AnimationClip.findByName( clips, 'dance' );
var action = mixer.clipAction( clip );
action.play();

// Play all animations
clips.forEach( function ( clip ) {
    mixer.clipAction( clip ).play();
} );