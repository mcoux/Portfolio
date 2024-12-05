import { FunctionOverloadingNode, PointLightHelper } from 'three/webgpu';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css'

import * as three from 'three'

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

const scene = new three.Scene();
const cam = new three.PerspectiveCamera(80, winWidth / winHeight, 0.1,1000);
const render = new three.WebGLRenderer({
    canvas : document.querySelector('#glcanvas'),
});

render.setPixelRatio(window.devicePixelRatio);
render.setSize(winWidth,winHeight);
cam.position.setZ(30);
cam.position.setY(10);


render.render(scene, cam);

const sphere = new three.SphereGeometry(5);

const matS = new three.MeshPhongMaterial({color: 0xFFFF00});
matS.emissive.set(0xFFFF55);

const soleil = new three.Mesh(sphere,matS);
soleil.position.set(0,10,-60)



const ambient = new three.AmbientLight(0xFFFFFF);

const pointLight = new three.PointLight(0xFFFFFF,20,200);
//pointLight.position.set(5,5,5);
const helper = new PointLightHelper(pointLight);


const axesHelper = new three.AxesHelper( 5 );
scene.add( axesHelper );

const gridHelper = new three.GridHelper( 200, 40 );

//const controls = new OrbitControls(cam,render.domElement);

scene.add( gridHelper )

scene.add(ambient);

scene.add(pointLight);
scene.add(helper);
scene.add(soleil);

function animate(){
    requestAnimationFrame(animate);


    //controls.update();

    render.render(scene, cam);

}

animate()