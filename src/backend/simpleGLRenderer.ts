import { mat4 } from "gl-matrix";
import { Camera } from "../camera";
import { SHADER_RE } from "../constants";
import { Griphic } from "../griphic";
import { GNode } from "../node";
import { ContainerShader, Program, simpeFsSOurce, simpleVsSource } from "../shaders";
import { attachVertexBuffer, createWebGLRenderingContext, glClear, IVertexConfig , ROOT } from "../utils";
import { Renderer } from "./renderer";


export class SimpleGLRenderer extends Renderer {
    private camera: Camera;
    private program: WebGLProgram | undefined;
    private gl: WebGLRenderingContext |  undefined;
    private gNode: GNode;

    constructor(camera: Camera, gNode: GNode) {
        super();

        this.camera = camera;
        this.gNode = gNode;
    }

    public bind(root: ROOT) {
        this.gl = createWebGLRenderingContext(root);

        const program: Program = new Program(this.gl);
        const vsShader: ContainerShader = new ContainerShader(program, simpleVsSource, SHADER_RE);
        vsShader.setMainShader();
        const fsShader: ContainerShader = new ContainerShader(program, simpeFsSOurce, SHADER_RE);
        fsShader.setMainShader("f");

        this.program = program.build();
    }

    public clear() {
        const gl = this.gl as WebGLRenderingContext;
        glClear(gl);
    }

    public attachPositionBuffer(vertexBuffer: WebGLBuffer) {
        const gl = this.gl as WebGLRenderingContext;
        const program: WebGLProgram = this.program as WebGLProgram;


        const config: IVertexConfig = {
            location: "vertex",
            numComponents: 2,
            target: gl.ARRAY_BUFFER,
            vertexBuffer,
        };

        attachVertexBuffer(gl, program, config);
    }

    public run(griphic: Griphic) {
        const gl = this.gl as WebGLRenderingContext;

        // render objects
        griphic.render(gl);

        const program: WebGLProgram = this.program as WebGLProgram;

        // projection matrix
        const projectionMatrix: mat4 = this.camera.projectMatrix();
        // view matrix
        const viewMatrix: mat4 = this.camera.viewMatrix();
        const modelMatrix: mat4 = mat4.create();

        const projectionMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "projectionMatrix") as WebGLUniformLocation;
        const viewMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "viewMatrix") as WebGLUniformLocation;
        const modelMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "modelMatrix") as WebGLUniformLocation;

        gl.useProgram(program);

        // use shader uniform
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);

        {
            // tslint:disable-next-line: no-shadowed-variable
            const offset: number = 0;
            const vertexCount: number = 3;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
}
