import { vec3 } from "gl-matrix";
import {
    Color,
    Griphic,
    PerspectiveCamera,
    SimpleGLRenderer,
    SphereGeometry,
} from "../../src";

const selector: string = "#canvas";
// camera
const fieldOfView: number = 45 * Math.PI / 180;
const canvas: HTMLCanvasElement = document.querySelector(selector) as HTMLCanvasElement;
const aspect = canvas.clientWidth / canvas.clientHeight;
const zNear: number = 0.1;
const zFar: number = 1000.0;

const camera: PerspectiveCamera = new PerspectiveCamera(fieldOfView, aspect, zNear, zFar);

// lookat
const eye: vec3 = vec3.fromValues(0, 0, 0);
const target: vec3 = vec3.fromValues(0, 0, 0.1);
const up: vec3 = vec3.fromValues(2, 3, 4);
camera.lookAt(eye, target, up);



const griphic = new Griphic();

// create sphere
const color = new Color();
const sphere = new SphereGeometry({ radius: 100, color });
sphere.position.x = 5;
sphere.position.y = 5;
sphere.position.z = 5;

griphic.addChild(sphere);

const renderer = new SimpleGLRenderer(camera);
renderer.bind(selector);

function animation() {
    renderer.run(griphic);
    requestAnimationFrame(animation);
}

animation();
