import { ContainerShader, createGL, IShader, LeafShader, Program, simpeFsSOurce, simpleVsSource, WebGLRenderer } from "../../src";

const baseRule: string = "#include<([A-z,0-9,.]+)>;";
const gl: WebGLRenderingContext = createGL("canvas");
const program: Program = new Program(gl);

const vsShader: ContainerShader = new ContainerShader(program, simpleVsSource, baseRule);
vsShader.setMainShader();
const fsShader: ContainerShader = new ContainerShader(program, simpeFsSOurce, baseRule);
fsShader.setMainShader("f");

const webglProgram: WebGLProgram = program.build();

const renderer = new WebGLRenderer();

function animation() {
    renderer.run(gl, webglProgram, []);
    requestAnimationFrame(animation);
}

animation();
