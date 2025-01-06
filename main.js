import { FunctionOverloadingNode, PointLightHelper } from 'three/webgpu';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { MathUtils } from 'three';
import './index.css'

import * as three from 'three'
import { EffectComposer, RenderPass } from 'three/examples/jsm/Addons.js';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

const scene = new three.Scene();
const cam = new three.PerspectiveCamera(80, winWidth / winHeight, 0.1,1000);
const render = new three.WebGLRenderer({
    canvas : document.querySelector('#glcanvas'),
});

const PLANE_COLOR = {color: 0x0e2b10}
const MTN_COLOR = {color: 0x0e2b10}
const SUN_COLOR = {color: 0xFFFFAA}
const BG_COLOR = {color: 0x3c7ab5}


render.setPixelRatio(window.devicePixelRatio);
render.setSize(winWidth,winHeight);
cam.position.setZ(30);
cam.position.setY(10);

render.render(scene, cam);


//BloomRenderer
const bloomRender = new RenderPass(scene,cam);
const bloomP = new UnrealBloomPass( new three.Vector2(winWidth,winHeight),1.5,0.4,0.85);
bloomP.threshold = 0;
bloomP.strength = 2;
bloomP.radius = 0;
const bloomComposer = new EffectComposer(render);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(bloomRender);
bloomComposer.addPass(bloomP);

//Soleil
const sphere = new three.SphereGeometry(5);

const matS = new three.MeshPhongMaterial(SUN_COLOR);
matS.emissive.set(0xFFFF55);
matS.specular.set(0xFFFFFF);
matS.shininess = 50;

const soleil = new three.Mesh(sphere,matS);
soleil.position.set(0,10,-60)


//Plan
const GeomP = new three.PlaneGeometry(200,200);
const matP = new three.MeshBasicMaterial(PLANE_COLOR);
const plane = new three.Mesh(GeomP, matP);
plane.rotateX(MathUtils.DEG2RAD*-90);
//scene.add( plane );

//pyramide
const geomPyr = new three.ConeGeometry(10, 20,3);
const matPyr = new three.MeshBasicMaterial(MTN_COLOR);
const pyr = new three.Mesh(geomPyr,matPyr);

pyr.position.set(20,10,-50);
scene.add(pyr)


const ambient = new three.AmbientLight(0xFFFFFF);



const axesHelper = new three.AxesHelper( 5 );
scene.add( axesHelper );


//const controls = new OrbitControls(cam,render.domElement);


scene.add(ambient);

scene.add(soleil);
scene.background = new three.Color(0x3c7ab5);

function moveCam(){
    const t =document.body.getBoundingClientRect().top;
    cam.position.y = 10 + t*0.005;
}

document.body.onscroll = moveCam;



function animate(){
    requestAnimationFrame(animate);


    //controls.update();

    render.render(scene, cam);
    //bloomComposer.render();
}

animate()