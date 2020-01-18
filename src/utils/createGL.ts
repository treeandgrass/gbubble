export function createGL(el: string | HTMLCanvasElement): WebGLRenderingContext {
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
