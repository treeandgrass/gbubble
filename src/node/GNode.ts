import { mat4, vec3 } from "gl-matrix";
import { Binding } from "../backend/binding";
import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { uuid } from "../utils";
import { Position } from "./position";

export class GNode extends Event {
    public uuid: string;
    public type: string;
    public children: GNode[];
    public position: Position;

    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
        this.children = [];
        this.position = new Position();
    }

    public addChild(node: GNode)  {
        this.children.push(node);
    }

    public  removeChild(node: GNode) {
        this.children.push(node);
    }

    public render(gl: WebGLRenderingContext | WebGL2RenderingContext, binding: Binding) {
        // extend by child
    }

    // set position
    public setPosition(x: number, y: number, z: number) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    private lookAt(): mat4 {
        const out: mat4 = mat4.create();
        out[12] = this.position.x;
        out[13] = this.position.y;
        out[14] = this.position.z;
        out[15] = 1;

        return out;
    }

    public get worldMatrix() {
        return this.lookAt();
    }
}
