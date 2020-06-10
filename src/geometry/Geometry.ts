import { mat4, vec3 } from "gl-matrix";
import { Binding } from "../backend/binding";
import { Color } from "../color";
import { GNode } from "../node/GNode";
import { Typed, TypedArray } from "../types";
import { IRenderingContext } from "../types";

export class Geometry extends GNode {
    private vertexs: vec3[];
    private colors: Color[];
    private indices: number[];

    constructor() {
        super();

        this.vertexs = [];
        this.colors = [];
        this.indices = [];
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

        // binding vertex
        const positionBuffer = gl.createBuffer();
        const pointData = this.geometric(Float32Array);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);

        binding.attachPositionBuffer(positionBuffer as WebGLBuffer);

        // bind colors
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const colorData = this.generateColors(Float32Array);
        gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);

        binding.attachColorBuffer(colorBuffer as WebGLBuffer);

        const offset: number = 0;
        gl.drawArrays(gl.TRIANGLES, offset, this.indices.length);
    }

    public clear() {
        this.vertexs = [];
        this.colors  = [];
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

    public getIndices(): number[] {
        return this.indices;
    }

    public pushIndices(indices: number[]): void {
        this.indices.push(...indices);
    }

    public geometric(Type: Typed): TypedArray {
        const vertexs: vec3[] =  this.getVertexs();
        const newVertexs: number[] =  [];
        this.getIndices().forEach((index: number) => {
          vertexs[index].forEach((i: number) => {
            newVertexs.push(i);
          });
        });

        return  new Type(newVertexs);
    }

    public generateColors(Type: Typed): TypedArray {
        const newColors: number[] = [];
        this.indices.forEach((index: number) => {
            this.colors[index].toRGB().forEach((i: number) => {
                newColors.push(i);
            });
        });
        return  new Type(newColors);
    }

}
