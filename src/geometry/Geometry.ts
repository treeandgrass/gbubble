import { vec3 } from "gl-matrix";
import { GNode } from "../node/GNode";
import { Typed, TypedArray } from "../types";


export class Geometry extends GNode {
    private vertexs: vec3[];
    private colors: vec3[];

    constructor() {
        super();

        this.vertexs = [];
        this.colors = [];
    }

    public render(gl: WebGL2RenderingContext) {
        // binding vertexs
        const positionBuffer = gl.createBuffer();
        const pointData = this.flatPoints(this.vertexs, Float32Array);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointData), gl.STATIC_DRAW);

        // bind colors
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const colorData = this.flatPoints(this.colors, Int8Array);
        gl.bufferData(gl.ARRAY_BUFFER, new Int8Array(colorData), gl.STATIC_DRAW);
    }

    public setColors(colors: vec3[]) {
        this.colors = colors;
    }

    public setVertexs(vertexs: vec3[]) {
        this.vertexs = vertexs;
    }

    public pushPoint(point: vec3) {
        this.vertexs.push(point);
    }

    public buildGeometry() {
        // extend in subclass
    }

    private flatPoints(points: vec3[], Type: Typed): TypedArray {
        const cords = points.reduce((acc: number[], vertex: vec3) => {
            acc.forEach((i: number) => acc.push(i));
            return acc;
        }, []);

        return  new Type(cords);
    }
}
