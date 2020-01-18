import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { uuid } from "../utils";

export class Node extends Event {
    public uuid: string;
    public type: string;

    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
    }

    public render() {
        // do noting
    }
}
