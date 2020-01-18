import { mat4 } from "gl-matrix";
import { vec3 } from "gl-matrix";
import { ORTHOGRAPHICAMERA_TYPE } from "../constants";
import { Camera } from "./camera";
import { Node } from "../node";

export class orthographicCamera extends Camera {
    constructor(readonly fovy: number, readonly aspect: number, readonly near: number, readonly far: number) {
        super(ORTHOGRAPHICAMERA_TYPE);
    }

    public projectMatrix(): mat4 {
        return mat4.create();
    }
}