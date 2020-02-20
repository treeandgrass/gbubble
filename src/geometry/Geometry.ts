import { GNode } from "../node/GNode";

class Geometry extends GNode {
    private vertexs: Float32Array;
    private colors: Uint8Array;

    constructor() {
        super();

        this.vertexs = new Float32Array();
        this.colors = new Uint8Array();
    }

    public render(gl: WebGL2RenderingContext) {
        // binding vertexs
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexs, gl.STATIC_DRAW);

        // bind colors
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    }

    public setColors(colors: Uint8Array) {
        this.colors = colors;
    }

    public setVertexs(vertexs: Float32Array) {
        this.vertexs = vertexs;
    }

}
