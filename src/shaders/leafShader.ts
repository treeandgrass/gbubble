import { BaseShader } from "./baseShader";
import { Program } from "./program";

export class LeafShader extends BaseShader {
    private template: string;

    constructor(program: Program, template: string, name?: string) {
        super(program, name);
        this.template = template;
        this.register();
    }

    public build(): string {
        return this.template;
    }
}
