import { Event } from "../events";
import { uuid } from "../utils";

export class Renderer extends Event {
    public uuid: string;

    constructor() {
        super();

        this.uuid = uuid();
    }

    public attachPositionBuffer(vertexs: Float32Array) {
        // extend in child class
    }
}
