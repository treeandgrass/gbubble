import Event from "../events/event";
import Shader from "./shader";

export default class Program  extends Event{
    private shaderMap: Map<string, Shader>;
    private gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        super();

        this.shaderMap = new Map();
        this.gl  = gl;
    }

    /**
     * build program
     * @param vertexEntry
     * @param fragmentEntry
     */
    public build(vertexEntry: string = "vMain", fragmentEntry: string = "fMain"): WebGLProgram {
        const vertexShader: Shader = this.shaderMap.get(vertexEntry);
        if (!vertexShader) {
            throw new Error(`no entry: ${vertexEntry}`);
        }

        const fragmentShader: Shader = this.shaderMap.get(fragmentEntry);
        if (!fragmentEntry) {
            throw new Error(`no entry: ${fragmentEntry}`);
        }

        const vertex: string = vertexShader.build();
        const fragment: string = fragmentShader.build();

        const program: WebGLProgram = this.gl.createProgram();

        // attach program shader
        this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, vertex));
        this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, fragment));

        return program;
    }

    /**
     * create an wbeglshader by type
     * @param type
     * @param source
     */
    public createShader(type: number, source: string): WebGLShader {
        const shader: WebGLShader =  this.gl.createShader(type);
        this.gl.shaderSource(shader, source);

        return shader;
    }

    /**
     * register shader
     * @param key
     * @param shader
     */
    public registerShader(key: string, shader: Shader) {
        this.shaderMap.set(key, shader);
    }
}
