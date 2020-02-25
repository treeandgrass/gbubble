import { attachBuffer, IVertexConfig } from "../../utils";
import { Binding } from "./Binding";

export class SimpleGLRendererBinding extends Binding  {
    constructor(readonly gl: WebGL2RenderingContext | WebGLRenderingContext, readonly program: WebGLProgram) {
        super();
    }

    public attachPositionBuffer(vertexs: WebGLBuffer) {
        const gl = this.gl as WebGLRenderingContext;
        const program: WebGLProgram = this.program as WebGLProgram;


        const config: IVertexConfig = {
            buffer: vertexs,
            location: "vertex",
            numComponents: 3,
            target: gl.ARRAY_BUFFER,
        };

        attachBuffer(gl, program, config);
    }

    public attachColorBuffer(color: WebGLBuffer) {
        const gl = this.gl as WebGLRenderingContext;
        const program: WebGLProgram = this.program as WebGLProgram;

        const config: IVertexConfig = {
            buffer:  color,
            location: "color",
            numComponents: 3,
            target: gl.ARRAY_BUFFER,
        };

        attachBuffer(gl, program, config);
    }
}
