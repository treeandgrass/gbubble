import signale from "signale";
import { IShader } from "./baseShader";
import { ContainerShader } from "./containerShader";
import { LeafShader } from "./leafShader";
import { Program } from "./program";

describe("test container shader", () => {
    const template: string = `
        #version 330;

        #include<shader1.h>;

        good, wold;

        #include<shader2.h>;
        ok, ok
        // end shader
        #include<shader2.h>;
        vec3 base;
    `;

    const shader1: string = "shader1 template";
    const shaderKey1 = "shader1.h";
    const shader2: string = "shader2 template";
    const shaderKey2 = "shader2.h";

    const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
    signale.debug(canvas);
    const ctx: WebGLRenderingContext = canvas.getContext("webgl") as WebGLRenderingContext;
    const program: Program = new Program(ctx);
    const containerShader: ContainerShader = new ContainerShader(program, template, "#include<([A-z,0-9,.]+)>;");

    test("test program registerShader and enquiry method", () => {
        const testShader1: LeafShader = new LeafShader(program, shader1);
        const testShader2: LeafShader = new LeafShader(program, shader2);
        program.registerShader(shaderKey1, testShader1);
        program.registerShader(shaderKey2, testShader2);

        const resultShader: IShader = program.enquiry(shaderKey1);
        expect(resultShader).toBe(testShader1);
    });

    test("test container shader build function", () => {
        const testTpl = `
        #version 330;

        shader1 template

        good, wold;

        shader2 template
        ok, ok
        // end shader
        shader2 template
        vec3 base;
    `;
        containerShader.setMainShader();
        const tpl: string = containerShader.build();
        expect(tpl).toBe(testTpl);
        signale.debug(tpl);
    });

    // test("test program build method", () => {
    //     const fShader: ContainerShader = new ContainerShader(program, template, "#include<([A-z,0-9,.]+)>;");
    //     fShader.setMainShader("f");

    //     signale.debug(program.build());
    // });
});
