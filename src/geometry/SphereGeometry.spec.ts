import { vec3 } from "gl-matrix";
import { Color } from "../index";
import { SphereGeometry } from "./SphereGeometry";

const color = new Color(vec3.fromValues(1.0, 1.0, 1.0));

const  sphereGeometry = new  SphereGeometry({
    color,
    radius: 8,
});

describe("test SphereGeometry object", () => {
    sphereGeometry.buildGeometry();

    test("flatPoints", () => {
        const vertexs = sphereGeometry.getVertexs();
        expect(sphereGeometry.flatPoints(vertexs, Float32Array)).toBeInstanceOf(Float32Array);
    });

    test("flatColors", ()  => {
        const colors = sphereGeometry.getColors();
        expect(sphereGeometry.flatColors(colors, Int8Array)).toBeInstanceOf(Int8Array);
    });
});
