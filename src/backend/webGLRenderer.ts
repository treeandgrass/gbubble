import { mat4, vec3 } from "gl-matrix";
import { Event } from "../events";

export class WebGLRenderer extends Event {
    constructor() {
        super();
    }

    public createBuffer(gl: WebGLRenderingContext, bindingData: number[]) {
        const buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bindingData), gl.STATIC_DRAW);
        return buffer;
    }

    public run(gl: WebGLRenderingContext, program: WebGLProgram, positionBuffer: WebGLBuffer) {

        // projection matrix
        const fieldOfView: number = 45 * Math.PI / 180;
        const canvas: HTMLCanvasElement = gl.canvas as HTMLCanvasElement;
        const aspect = canvas.clientWidth / canvas.clientHeight;
        const zNear: number = 0.1;
        const zFar: number = 1000.0;

        const projectionMatrix: mat4 = mat4.create();
        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

        // view matrix
        const viewMatrix: mat4 = mat4.create();
        const eye: vec3 = vec3.fromValues(50, 50, 100);
        const target: vec3 = vec3.fromValues(0, 0, 0.1);
        const up: vec3 = vec3.fromValues(2, 3, 4);
        mat4.lookAt(viewMatrix, eye, target, up);

        const modelMatrix: mat4 = mat4.create();

        const vertexLocation: number = gl.getAttribLocation(program, "vertex");
        const projectionMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "projectionMatrix") as WebGLUniformLocation;
        const viewMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "viewMatrix") as WebGLUniformLocation;
        const modelMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "modelMatrix") as WebGLUniformLocation;

        const numComponents: number = 2;
        const type: number = gl.FLOAT;
        const normalize: boolean = false;
        const stride: number = 0;
        const offset: number = 0;


        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(vertexLocation, numComponents, type, normalize, stride, offset);
        gl.enableVertexAttribArray(vertexLocation);

        gl.useProgram(program);

        // use shader uniform
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);

        {
            // tslint:disable-next-line: no-shadowed-variable
            const offset: number = 0;
            const vertexCount: number = 4;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
}
