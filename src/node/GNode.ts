import { mat4, vec3 } from "gl-matrix";
import { Renderer } from "../backend";
import { Binding } from "../backend/binding";
import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { uuid } from "../utils";

export class GNode extends Event {
    public uuid: string;
    public type: string;
    public children: GNode[];

    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
        this.children = [];
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
}
