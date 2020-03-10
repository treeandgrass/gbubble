import { mat4 } from "gl-matrix";
import { Camera } from "../camera";
import { SHADER_RE } from "../constants";
import { Griphic } from "../griphic";
import { ContainerShader, Program, simpeFsSOurce, simpleVsSource } from "../shaders";
import { IRenderingContext } from "../types";
import { createWebGLRenderingContext, glClear, ROOT } from "../utils";
import { Binding, SimpleGLRendererBinding } from "./binding";
import { Renderer } from "./renderer";


export class SimpleGLRenderer extends Renderer {
    private camera: Camera;
    private program: WebGLProgram | undefined;
    private gl: WebGLRenderingContext | undefined;
    private binding: Binding | undefined;

    constructor(camera: Camera) {
        super();

        this.camera = camera;
    }

    public bind(root: ROOT) {
        this.gl = createWebGLRenderingContext(root);

        const program: Program = new Program(this.gl);
        const vsShader: ContainerShader = new ContainerShader(program, simpleVsSource, SHADER_RE);
        vsShader.setMainShader();
        const fsShader: ContainerShader = new ContainerShader(program, simpeFsSOurce, SHADER_RE);
        fsShader.setMainShader("f");

        this.program = program.build();
        this.binding = new SimpleGLRendererBinding(this.gl, this.program);
    }

    public clear() {
        const gl = this.gl as WebGLRenderingContext;
        glClear(gl);
    }


    public run(griphic: Griphic) {
        const gl = this.gl as WebGLRenderingContext;

        const program: WebGLProgram = this.program as WebGLProgram;

        // projection matrix
        const projectionMatrix: mat4 = this.camera.projectMatrix();
        // view matrix
        const viewMatrix: mat4 = this.camera.viewMatrix();

        const projectionMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "projectionMatrix") as WebGLUniformLocation;
        const viewMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "viewMatrix") as WebGLUniformLocation;

        gl.useProgram(program);

        // use shader uniform
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);

        // render objects
        const context: IRenderingContext = { gl, program };
        griphic.render(context, this.binding as Binding);
    }
}
