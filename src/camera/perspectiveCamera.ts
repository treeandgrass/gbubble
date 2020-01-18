import { mat4, vec3 } from "gl-matrix";
import { PERSPECTIVECAMERA_TYPE } from "../constants";
import { Node } from "../node";
import { Camera } from "./camera";

export class PerspectiveCamera extends Camera {
    constructor(readonly fovy: number, readonly aspect: number, readonly near: number, readonly far: number) {
        super(PERSPECTIVECAMERA_TYPE);
    }

    public projectMatrix(): mat4 {
        return mat4.create();
    }
}

