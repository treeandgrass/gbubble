import { vec3 } from "gl-matrix";
import {
    GNode, PerspectiveCamera,
    SimpleGLRenderer,
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
const eye: vec3 = vec3.fromValues(50, 50, 100);
const target: vec3 = vec3.fromValues(0, 0, 0.1);
const up: vec3 = vec3.fromValues(2, 3, 4);
camera.lookAt(eye, target, up);



const gNode: GNode = new GNode();
const renderer = new SimpleGLRenderer(camera, gNode);
renderer.bind(selector);


const vertex1: number[] = [
    -10.0,  10.0,
    10.0,  10.0,
    -10.0, -10.0,
    10.0, -10.0,
];
const vertex2: number[] = [
    -17.0,  10.0,
    30.0,  5.0,
    -10.0, -18.0,
    20.0, -10.0,
];

const position1 = new Float32Array(vertex1);
const position2 = new Float32Array(vertex2);
const positionBuffer1: WebGLBuffer = renderer.createBuffer(position1);
const positionBuffer2: WebGLBuffer = renderer.createBuffer(position2);

function animation() {
    renderer.clear();
    renderer.attachPositionBuffer(positionBuffer1);
    renderer.run();
    renderer.attachPositionBuffer(positionBuffer2);
    renderer.run();

    requestAnimationFrame(animation);
}

animation();
