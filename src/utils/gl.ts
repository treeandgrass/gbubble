export function createWebGLRenderingContext(el: string | HTMLCanvasElement): WebGLRenderingContext {
    let canvas: HTMLCanvasElement;
    if (typeof el === "string") {
        canvas = document.querySelector(el) as HTMLCanvasElement;
    } else {
        canvas = el;
    }

    const gl: WebGLRenderingContext | null = canvas.getContext("webgl");
    if (gl === null) {
        throw new Error("webgl initialize failed!!");
    }

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
