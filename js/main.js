"use strict";

const scene = new THREE.Scene();
let character = new Character();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Handle window resize:
 *  - update aspect ratio.
 *  - update projection matrix
 *  - update renderer size
 */
window.addEventListener('resize', () => {
    character.camera.aspect = window.innerWidth / window.innerHeight;
    character.camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


/**
 * Add canvas element to DOM.
 */
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(30, 40, 0);

directionalLight.castShadow = true;

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512;  // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5;    // default
directionalLight.shadow.camera.far = 500;     // default

scene.add(directionalLight);


const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

cube.castShadow = true;
cube.position.set(0, 15, 0);

directionalLight.target = cube;

scene.add(cube);

const terrainWidth = 100;
let terrainGeometry;

/**
 * Add terrain:
 *
 * We have to wait for the image file to be loaded by the browser.
 * We pass a callback function with the stuff we want to do once the image is loaded.
 * There are many ways to handle asynchronous flow in your application.
 * An alternative way to handle asynchronous functions is async/await
 *  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 */
Utilities.loadImage('res/images/heightmap.png').then((heightmapImage) => {


    terrainGeometry = new TerrainBufferGeometry({
        width: terrainWidth,
        heightmapImage,
        numberOfSubdivisions: 128,
        height: 30
    });

    // const terrainMaterial = new MeshPhongMaterial({
    //     color: 0x777777
    // });


    const grassTexture = new THREE.TextureLoader().load('res/textures/snow_02.jpg');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(1000 / terrainWidth, 1000 / terrainWidth);

    const snowyRockTexture = new THREE.TextureLoader().load('res/textures/snowy_rock_01.png');
    snowyRockTexture.wrapS = THREE.RepeatWrapping;
    snowyRockTexture.wrapT = THREE.RepeatWrapping;
    snowyRockTexture.repeat.set(1500 / terrainWidth, 1500 / terrainWidth);


    const splatMap = new THREE.TextureLoader().load('res/images/splatmap_01.png');

    const terrainMaterial = new TextureSplattingMaterial({
        color: 0x777777,
        shininess: 0,
        textures: [snowyRockTexture, grassTexture],
        splatMaps: [splatMap]
    });

    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);

    terrain.castShadow = true;
    terrain.receiveShadow = true;

    scene.add(terrain);

//MIDLERTIDIG SKYBOX --FUNKER, men kan gjøres bedre
    /*
    const loader = new CubeTextureLoader();
    const texturesky = loader.load([
        'res/textures/iceflats_ft.png',
        'res/textures/iceflats_bk.png',
        'res/textures/iceflats_up.png',
        'res/textures/iceflats_dn.png',
        'res/textures/iceflats_rt.png',
        'res/textures/iceflats_lf.png'
    ]);
    scene.background = texturesky;

     */


    // Gjenstående ting av Sondre sine trær, om nødvendig
    //let tree = new Tree(terrainGeometry, terrainWidth, scene);


    //AxesHelper ikke i bruk per nå
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
});


let snow = new Snow(terrainWidth, scene);
let ice = new Ice(terrainWidth, scene);
let water = new Water(terrainWidth);




/**
 * Set up camera controller:
 */


// We attach a click lister to the canvas-element so that we can request a pointer lock.
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
const canvas = renderer.domElement;

canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});

let yaw = 0;
let pitch = 0;
const mouseSensitivity = 0.001;

function updateCamRotation(event) {
    yaw += event.movementX * mouseSensitivity;
    pitch += event.movementY * mouseSensitivity;
}

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
        canvas.addEventListener('mousemove', updateCamRotation, false);
    } else {
        canvas.removeEventListener('mousemove', updateCamRotation, false);
    }
});


window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        character.move.forward = true;
        e.preventDefault();
    } else if (e.code === 'KeyS') {
        character.move.backward = true;
        e.preventDefault();
    } else if (e.code === 'KeyA') {
        character.move.left = true;
        e.preventDefault();
    } else if (e.code === 'KeyD') {
        character.move.right = true;
        e.preventDefault();
    } else if (e.keyCode === 32) {
        character.move.up = true;
        e.preventDefault();
    } else if (e.keyCode === 17) {
        character.move.down = true;
        e.preventDefault();
    } else if (e.keyCode === 16) {
        character.move.run = true;
        e.preventDefault();
    }

});

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') {
        character.move.forward = false;
        e.preventDefault();
    } else if (e.code === 'KeyS') {
        character.move.backward = false;
        e.preventDefault();
    } else if (e.code === 'KeyA') {
        character.move.left = false;
        e.preventDefault();
    } else if (e.code === 'KeyD') {
        character.move.right = false;
        e.preventDefault();
    } else if (e.code === 'KeyF') {
        character.freeCam();
        e.preventDefault();
    } else if (e.keyCode === 17) {
        character.move.down = false;
        e.preventDefault();
    } else if (e.keyCode === 32) {
        character.move.up = false;
        e.preventDefault();
    } else if (e.keyCode === 16) {
        character.move.run = false;
        e.preventDefault();
    }
});


// // instantiate a loader
// const loader = new OBJLoader();

// // load a resource
// loader.load(
//     // resource URL
//     'resources/models/sofa.obj',
//     // called when resource is loaded
//     function (object) {
//         scene.add(object);
//     },
//     // called when loading is in progresses
//     function (xhr) {

//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');

//     },
//     // called when loading has errors
//     function (error) {

//         console.log('An error happened');

//     }
// );


let then = performance.now();

function loop(now) {

    const delta = now - then;
    then = now;


    // update controller rotation.
    character.mouseLookController.update(pitch, yaw);
    yaw = 0;
    pitch = 0;

    character.movement(delta);
    // apply rotation to velocity vector, and translate moveNode with it.


    // animate cube rotation:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    let fog = new Fog(character, ice);
    scene.fog = fog;

    snow.fall(1, character.camera);
    // render scene:
    renderer.render(scene, character.camera);

    requestAnimationFrame(loop);

};
//Gun


//Trestubbe

//new WorldObjects()
loop(performance.now());