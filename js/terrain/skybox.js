//FORSØK PÅ SKYBOX - Må jobbes litt mer med. Også endre bildene til noe mer passende
//https://stackoverflow.com/questions/31391021/positioning-objects-at-the-same-elevation
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'res/skybox/frozen_ft.png');
let texture_bk = new THREE.TextureLoader().load( 'res/skybox/frozen_bk.png');
let texture_up = new THREE.TextureLoader().load( 'res/skybox/frozen_up.png');
let texture_dn = new THREE.TextureLoader().load( 'res/skybox/frozen_dn.png');
let texture_rt = new THREE.TextureLoader().load( 'res/skybox/frozen_rt.png');
let texture_lf = new THREE.TextureLoader().load( 'res/skybox/frozen_lf.png');

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
//For å justere posisjonen til skyboxen (ser ikke helt bra ut per nå)
//skyboxGeo.translate( 0, 1000/2, 0 );

let skybox = new THREE.Mesh( skyboxGeo, materialArray );
//Justere posisjonen
skybox.position.set(0, 0, 0);
scene.add( skybox );