import "jest-canvas-mock";
import signale from "signale";
import { ContainerShader } from "./containerShader";
import { Program } from "./program";

describe("test container shader", () => {
    const template: string = `
        #version 330;

        #include<shader1.h>;
        #include<shader2.h>;

        // end shader
        vec3 base;
    `;

    const canvas: HTMLCanvasElement = document.createElement("canavs") as HTMLCanvasElement;
    const ctx: WebGLRenderingContext = canvas.getContext("webgl", {
        antialias: false,
        depth: false,
    }) as WebGLRenderingContext;
    const program: Program = new Program(ctx);
    const containerShader: ContainerShader = new ContainerShader(program, template, "#include<([A-z,0-9,.]+)>");
    test("test enquiry method", () => {
        signale.debug("start");
    });
});
