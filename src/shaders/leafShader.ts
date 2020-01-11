import { Event } from "../events/event";
import { IShader } from "./baseShader";

export class LeafShader implements IShader {
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    public build(): string {
        return this.template;
    }
}
