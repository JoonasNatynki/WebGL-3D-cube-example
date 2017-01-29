const scene = new THREE.Scene();                // The scene we are rendering
const renderer = new THREE.WebGLRenderer();     // The renderer
// Camera attributes
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const VIEW_ANGLE = 90;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.01;                  // Near clip plane
const FAR = 10000;                  // Far clip plane
const camera =
    new THREE.PerspectiveCamera
    (
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

camera.position.x = 100;
camera.position.y = 150;
camera.lookAt(new THREE.Vector3(50,100,-70));

  var amlight = new THREE.AmbientLight( 0x222222 );
  scene.add( amlight );

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

renderer.setSize( window.innerWidth, window.innerHeight );  // Set render view size
document.body.appendChild( renderer.domElement );           // Which element do we attach the scene to (in html)

                                        // Add the cube into the scene
scene.add(camera);                                          // Add the camera into the scene

var lightAmb = new THREE.AmbientLight(0x333333);
scene.add(lightAmb);

var cubes = generateCubes(10, 10, 10);



// Schedule the first frame.
requestAnimationFrame(update);      // We loop inside update function

function createCube()
{
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );         // Create geometry (vertices) to display (box)
    var material = new THREE.MeshLambertMaterial(               // Shader to be used by the mesh, set color
    {
        color: 0xCC0000     // red
    });

    var cube = new THREE.Mesh( geometry, material );
    return cube;
}

function generateCubes(x, y, z)
{
    var cubes = [];

    for(i = 0; i < x*y*z; i++)
    {
        cubes.push(createCube());
    }

    // console.log(cubes.length);

    cubes = moveCubes(cubes, x, y, z);

    cubes.forEach(function(element) 
    {
        scene.add(element);   
    }, this);


    return cubes;
}

function rotateCubes(cubes)
{
    cubes.forEach(function(element) 
    {
        element.rotation.z = element.rotation.z + 0.01;   // Rotate cube
        element.rotation.x = element.rotation.x + 0.01;   // Rotate cube    
    }, this);
}

function moveCubes(cubes, x, y, z)
{
    const startingPointX =50;
    const startingPointY =-50;
    const startingPointZ = -80;
    const step = 15;

    var index = 0;

    for(k = 0; k < z; k++)
    {
        for(j = 0; j < y; j++)
        {
            for(i = 0; i < x; i++)
            {
                cubes[index].position.x = startingPointX - (step*i);
                cubes[index].position.y = startingPointY + (step*j);
                cubes[index].position.z = startingPointZ - (step*k);
                console.log(cubes[index].position);
                index++;
            }
        }    
    }    
    return cubes;
}


function update ()
{


    rotateCubes(cubes);

    renderer.render(scene, camera);             // Render scene and the camera

    // Schedule the next frame.
    requestAnimationFrame(update);
}