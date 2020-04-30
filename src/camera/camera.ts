import { mat4, vec3 } from "gl-matrix";
import { GNode, Vector } from "../node";

export class Camera extends GNode {
    // tslint:disable-next-line: variable-name
    public up: Vector;
    public center: Vector;

    constructor() {
        super();

        this.up = new Vector(0, 1.0, 0);
        this.center = new Vector(0, 0, 0);

    }

    public lookAt(eye: vec3, center: vec3, up: vec3) {
        const view: mat4 = mat4.create();
        mat4.lookAt(view, eye, center, up);
        return view;
    }

    public projectMatrix(): mat4 {
        return mat4.create();
    }

    public viewMatrix(): mat4 {
        const eye: vec3 = this.position.toVector();
        const target: vec3 = this.center.toVector();
        const up: vec3 = this.up.toVector();
        return this.lookAt(eye, target, up);
    }
}
