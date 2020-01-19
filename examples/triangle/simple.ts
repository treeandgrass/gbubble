import { vec3 } from "gl-matrix";
import {
    ContainerShader, createWebGLRenderingContext, glClear, GNode, PerspectiveCamera, Program, simpeFsSOurce,
    simpleVsSource, WebGLRenderer,
} from "../../src";

const baseRule: string = "#include<([A-z,0-9,.]+)>;";
const gl: WebGLRenderingContext = createWebGLRenderingContext("canvas");
const program: Program = new Program(gl);

const vsShader: ContainerShader = new ContainerShader(program, simpleVsSource, baseRule);
vsShader.setMainShader();
const fsShader: ContainerShader = new ContainerShader(program, simpeFsSOurce, baseRule);
fsShader.setMainShader("f");

const webglProgram: WebGLProgram = program.build();

// camera
const fieldOfView: number = 45 * Math.PI / 180;
const canvas: HTMLCanvasElement = gl.canvas as HTMLCanvasElement;
const aspect = canvas.clientWidth / canvas.clientHeight;
const zNear: number = 0.1;
const zFar: number = 1000.0;

const camera: PerspectiveCamera = new PerspectiveCamera(fieldOfView, aspect, zNear, zFar);

// lookat
const eye: vec3 = vec3.fromValues(50, 50, 100);
const target: vec3 = vec3.fromValues(0, 0, 0.1);
const up: vec3 = vec3.fromValues(2, 3, 4);
camera.lookAt(eye, target, up);

const node: GNode = new GNode();
const renderer = new WebGLRenderer(camera, node, webglProgram, gl);
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
    glClear(gl);
    renderer.attachPositionBuffer(positionBuffer1);
    renderer.run();
    renderer.attachPositionBuffer(positionBuffer2);
    renderer.run();

    requestAnimationFrame(animation);
}

animation();
