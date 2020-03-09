import { mat4, quat, vec3 } from "gl-matrix";
import { Binding } from "../backend/binding";
import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { Euler } from "../math/Euler";
import { setFromEuler } from "../math/Quaternion";
import { uuid } from "../utils";
import { Position } from "./Position";

export class GNode extends Event {
    public uuid: string;
    public type: string;
    public children: GNode[];
    public position: Position;
    public rotation: Euler;
    public scale: vec3;
    // tslint:disable-next-line: variable-name
    public _worldMatrix: mat4;
    public shouldUpdateWorldMatrix: boolean;


    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
        this.children = [];
        this.position = new Position();
        this.rotation = new Euler();
        this.scale = vec3.create();
        this._worldMatrix = mat4.create();
        this.shouldUpdateWorldMatrix = true;
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

    public updateWorldMatrix(): mat4 {
        const out: mat4 = mat4.create();
        // quaternion
        const q: quat = quat.create();
        setFromEuler(q, this.rotation);
        // position
        const p: vec3 = this.position.toVector();

        // make rotation form quaternion,roatation,scale
        mat4.fromRotationTranslationScale(out, q, p, this.scale);

        return out;
    }

    public get worldMatrix() {
        if (this.shouldUpdateWorldMatrix) {
            this._worldMatrix = this.updateWorldMatrix();
            this.shouldUpdateWorldMatrix = false;
        }

        return this._worldMatrix;
    }
}
