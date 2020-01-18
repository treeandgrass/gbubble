import {
    ContainerShader, createWebGLRenderingContext, glClear, Program, simpeFsSOurce,
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

const renderer = new WebGLRenderer();
const positions: number[] = [
    -10.0,  10.0,
    10.0,  10.0,
    -10.0, -10.0,
    10.0, -10.0,
];

const position2: number[] = [
    -17.0,  10.0,
    30.0,  5.0,
    -10.0, -18.0,
    20.0, -10.0,
];

const positionBuffer: WebGLBuffer = renderer.createBuffer(gl, positions);
const positionBuffer2: WebGLBuffer = renderer.createBuffer(gl, position2);

function animation() {
    glClear(gl);
    renderer.run(gl, webglProgram, positionBuffer);
    renderer.run(gl, webglProgram, positionBuffer2);
    requestAnimationFrame(animation);
}

animation();
