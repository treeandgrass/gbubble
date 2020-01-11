import { Event } from "../events/event";
import { IShader as Shader } from "./baseShader";
import { LeafShader } from "./leafShader";

export class Program  extends Event {
    private shaderMap: Map<string, Shader>;
    private gl: WebGLRenderingContext;
    private fragmentEntry: string;
    private vertexEntry: string;

    constructor(gl: WebGLRenderingContext) {
        super();

        this.gl  = gl;
        this.vertexEntry = "";
        this.fragmentEntry = "";
        this.shaderMap = new Map();
    }

    /**
     * build program
     * @param vertexEntry
     * @param fragmentEntry
     */
    public build(vertexEntry?: string, fragmentEntry?: string): WebGLProgram {
        // update new entry
        if (vertexEntry) { this.vertexEntry = vertexEntry; }
        if (fragmentEntry) { this.fragmentEntry = this.fragmentEntry; }

        const vertexShader: Shader = this.shaderMap.get(this.vertexEntry) as Shader;
        if (!vertexShader) {
            throw new Error(`no entry: ${this.vertexEntry}`);
        }

        const fragmentShader: Shader = this.shaderMap.get(this.fragmentEntry) as Shader;
        if (!fragmentShader) {
            throw new Error(`no entry: ${this.fragmentEntry}`);
        }

        const vertex: string = vertexShader.build();
        const fragment: string = fragmentShader.build();

        const program: WebGLProgram = this.gl.createProgram() as WebGLProgram;

        // attach program shader
        this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, vertex));
        this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, fragment));

        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info: string = this.gl.getProgramInfoLog(program) as string;
            throw info;
        }

        return program;
    }

    /**
     * create an wbeglshader by type
     * @param type
     * @param source
     */
    public createShader(type: number, source: string): WebGLShader {
        const shader: WebGLShader =  this.gl.createShader(type) as WebGLShader;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const shaderInfo: string = this.gl.getShaderInfoLog(shader) as string;
            throw shaderInfo;
        }

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

    /**
     * query shader by name
     * @param shaderKey
     */
    public enquiry(shaderKey: string): Shader {
        let shader: Shader = this.shaderMap.get(shaderKey) as Shader;
        if (!shader) {
            shader = new LeafShader(this, "");
        }
        return shader;
    }

    /**
     * set main shader
     * @param name
     * @param type
     */
    public setMainShader(name: string, type: string) {
        if (type === "v") {
            this.vertexEntry = name;
        } else {
            this.fragmentEntry = name;
        }
    }
}
