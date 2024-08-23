/* Importing Three Js library */
import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();

//renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding

//camera
var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 5);

//canvas -- > append in html
var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);

//light
const light = new THREE.AmbientLight( 0x222222, 1 ); // soft white light
scene.add( light );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0.788, 1.547, 6.26 );
spotLight.castShadow = true;
scene.add( spotLight );




const blueSpotLight = new THREE.SpotLight(0xF2CC4, 20);
blueSpotLight.position.set(2, 2, 1); // Position at the right top corner
blueSpotLight.angle = Math.PI / 50; // Narrower spotlight cone for a focused beam
blueSpotLight.penumbra = 0.2; // Slightly softer edges
blueSpotLight.decay = 0; // Light decay over distance
blueSpotLight.distance = 100; // Light distance// Adding shadows to make the light more realistic
blueSpotLight.castShadow = true;
blueSpotLight.shadow.mapSize.width = 1024;
blueSpotLight.shadow.mapSize.height = 1024;
blueSpotLight.shadow.camera.near = 0.1;
blueSpotLight.shadow.camera.far = 50;

scene.add(blueSpotLight);
setTimeout(() => {
  scene.remove(blueSpotLight);
}, 7000); 



//gltf loader
const loader = new GLTFLoader();
loader.load( 'scene.glb', function ( gltf ) {
  base.add( gltf.scene );
} );


let base = new THREE.Object3D();
scene.add(base);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 12 - 6;
  mouse.y = - ( event.clientY / window.innerHeight ) * 12 + 6;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
  // console.log(mouse.x)
  // console.log(mouse.y)
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);

});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
  
}

