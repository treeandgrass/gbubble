import { mat4 } from "gl-matrix";
import { ORTHOGRAPHICAMERA_TYPE } from "../constants";
import { Camera } from "./camera";

export class OrthographicCamera extends Camera {
    constructor(readonly left: number, readonly right: number, readonly bottom: number, readonly top: number,
                readonly zNear: number, readonly zFar: number) {
        super();
        this.type = ORTHOGRAPHICAMERA_TYPE;
    }

    public projectMatrix(): mat4 {
        const orthgriphic: mat4 = mat4.create();
        mat4.ortho(orthgriphic, this.left, this.right, this.bottom, this.top, this.zNear, this.zFar);
        return orthgriphic;
    }
}
