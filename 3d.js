const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
// Set some camera attributes.
const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.01;
const FAR = 10000;
const camera =
    new THREE.PerspectiveCamera
    (
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
// create a point light
const pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 0;
pointLight.position.y = -100;
pointLight.position.z = 0;

// add to the scene
scene.add(pointLight);
// create a point light
const pointLight2 = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight2.position.x = 0;
pointLight2.position.y = 100;
pointLight2.position.z = -100;

// add to the scene
scene.add(pointLight2);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var material = new THREE.MeshLambertMaterial(
{
    color: 0xCC0000
});

var cube = new THREE.Mesh( geometry, material );
cube.position.z = -80;

scene.add( cube );
scene.add(camera);


function update ()
{
    // Draw!
    cube.rotation.z = cube.rotation.z + 0.01;
    cube.rotation.x = cube.rotation.x + 0.01;
    renderer.render(scene, camera);

    // Schedule the next frame.
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);