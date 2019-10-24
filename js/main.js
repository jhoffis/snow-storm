import {
    PerspectiveCamera,
    WebGLRenderer,
    PCFSoftShadowMap,
    Scene,
    BoxBufferGeometry,
    Mesh,
    TextureLoader,
    RepeatWrapping,
    DirectionalLight,
    AmbientLight,
    MeshPhongMaterial,
    Vector3,
    MeshBasicMaterial,
    AxesHelper,
   BackSide
} from './lib/three.module.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/build/three.module.js';

import Utilities from './lib/Utilities.js';
import MouseLookController from './controls/MouseLookController.js';

import TextureSplattingMaterial from './materials/TextureSplattingMaterial.js';
import TerrainBufferGeometry from './terrain/TerrainBufferGeometry.js';
//import {CubeGeometry, DoubleSide} from "./lib/three.module";
import Snow from './terrain/snow.js';
import Ice from './terrain/Ice.js';
//gjenstående ting fra Sondre sine gamle trær om nødvendig
//import Tree from './terrain/trees.js';

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let freeCam = false;

const renderer = new WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

/**
 * Handle window resize:
 *  - update aspect ratio.
 *  - update projection matrix
 *  - update renderer size
 */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);



/**
 * Add canvas element to DOM.
 */
document.body.appendChild(renderer.domElement);

const ambientLight = new AmbientLight(0xffffff, 0.55);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 2);
directionalLight.position.set(30, 40, 0);

directionalLight.castShadow = true;

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512;  // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5;    // default
directionalLight.shadow.camera.far = 500;     // default

scene.add(directionalLight);


const geometry = new BoxBufferGeometry(1, 1, 1);
const material = new MeshPhongMaterial({color: 0x00ff00});
const cube = new Mesh(geometry, material);

cube.castShadow = true;
cube.position.set(0, 15, 0);

directionalLight.target = cube;

scene.add(cube);

camera.position.z = 10.2;
camera.position.y = 25.2;

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
        height: 40
    });

    // const terrainMaterial = new MeshPhongMaterial({
    //     color: 0x777777
    // });


    const grassTexture = new TextureLoader().load('res/textures/grass_01.jpg');
    grassTexture.wrapS = RepeatWrapping;
    grassTexture.wrapT = RepeatWrapping;
    grassTexture.repeat.set(1000 / terrainWidth, 1000 / terrainWidth);

    const snowyRockTexture = new TextureLoader().load('res/textures/snowy_rock_01.png');
    snowyRockTexture.wrapS = RepeatWrapping;
    snowyRockTexture.wrapT = RepeatWrapping;
    snowyRockTexture.repeat.set(1500 / terrainWidth, 1500 / terrainWidth);


    const splatMap = new TextureLoader().load('res/images/splatmap_01.png');

    const terrainMaterial = new TextureSplattingMaterial({
        color: 0x777777,
        shininess: 0,
        textures: [snowyRockTexture, grassTexture],
        splatMaps: [splatMap]
    });

    const terrain = new Mesh(terrainGeometry, terrainMaterial);

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

//FORSØK PÅ SKYBOX - Må jobbes litt mer med. Også endre bildene til noe mer passende
    //https://stackoverflow.com/questions/31391021/positioning-objects-at-the-same-elevation
    let materialArray = [];
    let texture_ft = new TextureLoader().load( 'res/textures/iceflats_ft.png');
    let texture_bk = new TextureLoader().load( 'res/textures/iceflats_bk.png');
    let texture_up = new TextureLoader().load( 'res/textures/iceflats_up.png');
    let texture_dn = new TextureLoader().load( 'res/textures/iceflats_dn.png');
    let texture_rt = new TextureLoader().load( 'res/textures/iceflats_rt.png');
    let texture_lf = new TextureLoader().load( 'res/textures/iceflats_lf.png');

    materialArray.push(new MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = BackSide;

    let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
    //For å justere posisjonen til skyboxen (ser ikke helt bra ut per nå)
    //skyboxGeo.translate( 0, 1000/2, 0 );

    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    //Justere posisjonen
    skybox.position.set(0, 0, 0);
    scene.add( skybox );

    // Gjenstående ting av Sondre sine trær, om nødvendig
    //let tree = new Tree(terrainGeometry, terrainWidth, scene);


    //AxesHelper ikke i bruk per nå
    var axesHelper = new AxesHelper( 5 );
    scene.add( axesHelper );
});


let snow = new Snow(terrainWidth, scene);
let ice = new Ice(terrainWidth, scene);



/**
 * Set up camera controller:
 */

const mouseLookController = new MouseLookController(camera);

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

let move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    speed: 0.01
};

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        move.forward = true;
        e.preventDefault();
    } else if (e.code === 'KeyS') {
        move.backward = true;
        e.preventDefault();
    } else if (e.code === 'KeyA') {
        move.left = true;
        e.preventDefault();
    } else if (e.code === 'KeyD') {
        move.right = true;
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') {
        move.forward = false;
        e.preventDefault();
    } else if (e.code === 'KeyS') {
        move.backward = false;
        e.preventDefault();
    } else if (e.code === 'KeyA') {
        move.left = false;
        e.preventDefault();
    } else if (e.code === 'KeyD') {
        move.right = false;
        e.preventDefault();
    } else if (e.code === 'KeyF') {
        freeCam = !freeCam;
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

const velocity = new Vector3(0.0, 0.0, 0.0);

let then = performance.now();

function loop(now) {

    const delta = now - then;
    then = now;

    const moveSpeed = move.speed * delta;

    velocity.set(0.0, 0.0, 0.0);

    if (move.left) {
        velocity.x -= moveSpeed;
    }

    if (move.right) {
        velocity.x += moveSpeed;
    }

    if (move.forward) {
        velocity.z -= moveSpeed;
    }

    if (move.backward) {
        velocity.z += moveSpeed;
    }

    // update controller rotation.
    mouseLookController.update(pitch, yaw);
    yaw = 0;
    pitch = 0;

    // apply rotation to velocity vector, and translate moveNode with it.

    velocity.applyQuaternion(camera.quaternion);
    camera.position.add(velocity);


    // animate cube rotation:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if (terrainGeometry != null && freeCam === false) {
        let heightCam = terrainGeometry.getHeightAtPrecise(camera.position.clone());
        if (heightCam < 200)
            camera.position.y = heightCam + 2;
    }

    snow.fall(1, camera);
    // render scene:
    renderer.render(scene, camera);

    requestAnimationFrame(loop);

};

loop(performance.now());