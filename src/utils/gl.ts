export interface IVertexConfig {
    numComponents: number;
    target: number;
    vertexBuffer: WebGLBuffer;
    location: string;
}

export interface IBindingConfig {
    numComponents: number;
    target: number;
    vertexBuffer: WebGLBuffer;
}

export type ROOT = string | HTMLCanvasElement | WebGLRenderingContext;


export function createWebGLRenderingContext(el: string
    | HTMLCanvasElement | WebGLRenderingContext): WebGLRenderingContext {

    let canvas: HTMLCanvasElement;
    if (el instanceof WebGLRenderingContext) {   return el; }

    if (typeof el === "string") {
        canvas = document.querySelector(el) as HTMLCanvasElement;
    } else {
        canvas = el;
    }

    const gl: WebGLRenderingContext | null = canvas.getContext("webgl");
    if (gl === null) { throw new Error("webgl initialize failed!!"); }
    return gl;
}


export function glClear(gl: WebGLRenderingContext) {
    gl.clearColor(0, 0, 0,  1.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // tslint:disable-next-line: no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export function createBuffer(gl: WebGLRenderingContext, binding: Float32Array, target: number, drawType: number) {
    const buffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, binding, drawType);
    return buffer;
}

export function attachVertexBuffer(gl: WebGLRenderingContext, program: WebGLProgram, config: IVertexConfig) {
    const vertexLocation: number = gl.getAttribLocation(program, config.location);
    const { vertexBuffer, numComponents } = config;
    // bindings
    gl.bindBuffer(config.target, vertexBuffer);
    gl.vertexAttribPointer(vertexLocation, numComponents, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexLocation);
}

// fetch all attributelocations
export function fetchAttributeLocatios(gl: WebGLRenderingContext, program: WebGLProgram): Map<string, number> {
    const n: number = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    const attributeLocatons: Map<string, number> = new Map();

    for (let i = 0; i < n; i++) {
        const info: WebGLActiveInfo | null = gl.getActiveAttrib(program, i);
        if (!info) { continue; }
        attributeLocatons.set(info.name, gl.getAttribLocation(program, info.name));
    }
    return attributeLocatons;
}

export function glBinding(gl: WebGLRenderingContext, program: WebGLProgram, bindingMap: Map<string, IBindingConfig>) {
    const attributeLocations: Map<string, number> =  fetchAttributeLocatios(gl, program);
    bindingMap.forEach((value: IBindingConfig, key: string) => {
        const location: number | undefined = attributeLocations.get(key);
        if (!location) { throw new Error(`can't find ${key}'s location`); }

        gl.bindBuffer(value.target, value.vertexBuffer);
        gl.vertexAttribPointer(location, value.numComponents, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);
    });
}
