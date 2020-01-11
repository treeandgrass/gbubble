import { BaseShader, IShader } from "./baseShader";
import { Program } from "./program";

export class KeyShader extends BaseShader {
    private key: string;

    constructor(program: Program, key: string, name?: string) {
        super(program, name);

        this.key = key;
        this.register();
    }

    public build(): string {
        const shader: IShader = this.program.enquiry(this.key);
        if (!shader) {
            throw new Error(`no shader for name ${this.key}`);
        }

        if ((shader as BaseShader).uuid === this.uuid) {
            throw new Error(`loop call, shader name for ${this.key}, uuid ${this.uuid}`);
        }

        return shader.build();
    }
}
