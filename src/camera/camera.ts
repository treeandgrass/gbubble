import { mat4, vec3 } from "gl-matrix";
import { GNode } from "../node";

export class Camera extends GNode {
    // tslint:disable-next-line: variable-name
    private view: mat4;

    constructor() {
        super();

        this.view = mat4.create();
    }

    public lookAt(eye: vec3, center: vec3, up: vec3) {
        mat4.lookAt(this.view, eye, center, up);
    }

    public projectMatrix(): mat4 {
        return mat4.create();
    }

    public viewMatrix(): mat4 {
        return this.view;
    }
}
