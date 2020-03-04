import { mat4 } from "gl-matrix";
import { GNode } from "./GNode";

describe("test gnode class", () => {
    const gNode = new GNode();

    test("set node position", () => {
        gNode.position.x = 3;
        gNode.position.y = 10;
        gNode.position.z = 8;
    });

    test("out worldMatrix", () => {
        const want = mat4.fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 10, 8, 1);
        expect(gNode.worldMatrix).toEqual(want);
    });
});
