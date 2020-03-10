import { mat4, quat, vec3 } from "gl-matrix";
import { Binding } from "../backend/binding";
import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { Euler } from "../math/Euler";
import { setFromEuler } from "../math/Quaternion";
import { IRenderingContext } from "../types";
import { uuid } from "../utils";
import { Vector } from "./Position";

export class GNode extends Event {
    public uuid: string;
    public type: string;
    public children: GNode[];
    public position: Vector;
    public rotation: Euler;
    public scale: Vector;
    // tslint:disable-next-line: variable-name
    public _worldMatrix: mat4;
    public shouldUpdateWorldMatrix: boolean;


    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
        this.children = [];
        this.position = new Vector();
        this.rotation = new Euler();
        this.scale = new Vector();
        this._worldMatrix = mat4.create();
        this.shouldUpdateWorldMatrix = true;
    }

    public addChild(node: GNode)  {
        this.children.push(node);
    }

    public  removeChild(node: GNode) {
        this.children.push(node);
    }

    public render(context: IRenderingContext, binding: Binding) {
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
        mat4.identity(out);

        const q: quat = quat.create();
        setFromEuler(q, this.rotation);

        const p: vec3 = this.position.toVector();

        const s: vec3 = this.scale.toVector();

        mat4.fromRotationTranslationScale(out, q, p, s);

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
