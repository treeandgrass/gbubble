import { mat4, vec3 } from "gl-matrix";
import { PERSPECTIVECAMERA_TYPE } from "../constants";
import { Camera } from "./camera";

export class PerspectiveCamera extends Camera {
    constructor(readonly fovy: number, readonly aspect: number, readonly near: number, readonly far: number) {
        super();

        this.type = PERSPECTIVECAMERA_TYPE;
    }

    public projectMatrix(): mat4 {
        const perspective: mat4 = mat4.create();
        mat4.perspective(perspective, this.fovy, this.aspect, this.near, this.far);
        return perspective;
    }
}

