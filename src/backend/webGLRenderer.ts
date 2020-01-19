import { mat4, vec3 } from "gl-matrix";
import { Camera } from "../camera";
import { Event } from "../events";
import { GNode } from "../gnode";
import { Renderer } from "./renderer";

export class WebGLRenderer extends Renderer {
    private camera: Camera;
    private node: GNode;
    private program: WebGLProgram;
    private gl: WebGLRenderingContext;
    constructor(camera: Camera, node: GNode, program: WebGLProgram, gl: WebGLRenderingContext) {
        super();

        this.gl  = gl;
        this.node = node;
        this.camera = camera;
        this.program = program;
    }

    public createBuffer(bindingData: Float32Array) {
        const buffer: WebGLBuffer = this.gl.createBuffer() as WebGLBuffer;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

        this.gl.bufferData(this.gl.ARRAY_BUFFER, bindingData, this.gl.STATIC_DRAW);
        return buffer;
    }

    public attachPositionBuffer(positionBuffer: WebGLBuffer) {
        const vertexLocation: number = this.gl.getAttribLocation(this.program, "vertex");

        const numComponents: number = 2;
        const type: number = this.gl.FLOAT;
        const normalize: boolean = false;
        const stride: number = 0;
        const offset: number = 0;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(vertexLocation, numComponents, type, normalize, stride, offset);
        this.gl.enableVertexAttribArray(vertexLocation);
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
