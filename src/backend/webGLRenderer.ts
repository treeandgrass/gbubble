import { mat4, vec3 } from "gl-matrix";
import { Camera } from "../camera";
import { GNode } from "../node";
import {attachVertexBuffer, createBuffer, glClear } from "../utils";
import { Renderer } from "./renderer";

export class WebGLRenderer extends Renderer {
    private camera: Camera;
    private program: WebGLProgram;
    private gl: WebGLRenderingContext;
    constructor(camera: Camera, program: WebGLProgram, gl: WebGLRenderingContext) {
        super();

        this.gl  = gl;
        this.camera = camera;
        this.program = program;
    }

    public run() {
        // projection matrix
        const projectionMatrix: mat4 = this.camera.projectMatrix();
        // view matrix
        const viewMatrix: mat4 = this.camera.viewMatrix();

        const modelMatrix: mat4 = mat4.create();

        const projectionMatrixLocation: WebGLUniformLocation =
            this.gl.getUniformLocation(this.program, "projectionMatrix") as WebGLUniformLocation;
        const viewMatrixLocation: WebGLUniformLocation =
            this.gl.getUniformLocation(this.program, "viewMatrix") as WebGLUniformLocation;
        const modelMatrixLocation: WebGLUniformLocation =
            this.gl.getUniformLocation(this.program, "modelMatrix") as WebGLUniformLocation;

        this.gl.useProgram(this.program);

        // use shader uniform
        this.gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        this.gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        this.gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);

        {
            // tslint:disable-next-line: no-shadowed-variable
            const offset: number = 0;
            const vertexCount: number = 4;
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
}
