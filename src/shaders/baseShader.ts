import { Event } from "../events";
import { uuid } from "../utils";
import { Program } from "./program";

export interface IShader {
    build(): string;
}


export class BaseShader extends Event implements IShader {
    public uuid: string;
    public name: string;
    protected program: Program;

    constructor(program: Program, name?: string) {
        super();

        this.uuid = uuid();
        this.program = program;
        this.name = name || this.uuid;
    }

    public build(): string {
        return "";
    }

    protected register() {
        this.program.registerShader(this.uuid, this);
    }
}
