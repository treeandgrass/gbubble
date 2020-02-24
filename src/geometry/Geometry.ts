import { vec3 } from "gl-matrix";
import { GNode } from "../node/GNode";
import { Color } from "../color";
import { Typed, TypedArray } from "../types";


export class Geometry extends GNode {
    private vertexs: vec3[];
    private colors: Color[];

    constructor() {
        super();

        this.vertexs = [];
        this.colors = [];
    }

    public render(gl: WebGLRenderingContext | WebGL2RenderingContext) {
        // build geometry
        this.buildGeometry();
    
        // binding vertexs
        const positionBuffer = gl.createBuffer();
        const pointData = this.flatPoints(this.vertexs, Float32Array);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointData), gl.STATIC_DRAW);

        // bind colors
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const colorData = this.flatColors(this.colors, Int8Array);
        gl.bufferData(gl.ARRAY_BUFFER, new Int8Array(colorData), gl.STATIC_DRAW);
    }

    public setColors(colors: Color[]) {
        this.colors = colors;
    }

    public getColors():  Color[]{
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
