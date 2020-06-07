import { mat4, vec3 } from "gl-matrix";
import { Binding } from "../backend/binding";
import { Color } from "../color";
import { GNode } from "../node/GNode";
import { Typed, TypedArray } from "../types";
import { IRenderingContext } from "../types";

export class Geometry extends GNode {
    private vertexs: vec3[];
    private colors: Color[];

    constructor() {
        super();

        this.vertexs = [];
        this.colors = [];
    }

    public render(context: IRenderingContext, binding: Binding) {
        const { gl, program } = context;

        // upload worldMatrix
        const worldMatrix: mat4 = this.worldMatrix;
        // const worldMatrix: mat4 = mat4.create();
        mat4.identity(worldMatrix);

        const modelMatrixLocation: WebGLUniformLocation =
            gl.getUniformLocation(program, "modelMatrix") as WebGLUniformLocation;
        gl.uniformMatrix4fv(modelMatrixLocation, false, worldMatrix);

        // build geometry
        this.buildGeometry();
        // binding vertexs
        const positionBuffer = gl.createBuffer();
        const pointData = this.flatPoints(this.vertexs, Float32Array);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);

        binding.attachPositionBuffer(positionBuffer as WebGLBuffer);

        // bind colors
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const colorData = this.flatColors(this.colors, Float32Array);
        gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);

        binding.attachColorBuffer(colorBuffer as WebGLBuffer);

        const offset: number = 0;
        const vertexCount: number = 3;
        gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }

    public setColors(colors: Color[]) {
        this.colors = colors;
    }

    public getColors(): Color[] {
        return this.colors;
    }

    public setVertexs(vertexs: vec3[]) {
        this.vertexs = vertexs;
    }

    public pushPoint(point: vec3) {
        this.vertexs.push(point);
    }

    public pushColor(color: Color) {
        this.colors.push(color);
    }

    public buildGeometry() {
        // extend in subclass
    }

    public getVertexs(): vec3[] {
        return this.vertexs;
    }

    public flatPoints(points: vec3[], Type: Typed): TypedArray {
        const cords = points.reduce((acc: number[], vertex: vec3) => {
            vertex.forEach((i: number) => acc.push(i));
            return acc;
        }, []);

        return  new Type(cords);
    }

    public flatColors(colors: Color[], Type: Typed): TypedArray {
        const cords = colors.reduce((acc: number[], color: Color) => {
            color.toRGB().forEach((i: number) => acc.push(i));
            return acc;
        }, []);

        return  new Type(cords);
    }
}
