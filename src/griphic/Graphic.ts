import { Binding } from "src/backend/binding";
import { GNode } from "../node/GNode";

export class Griphic extends GNode {
    public  render(gl: WebGLRenderingContext | WebGL2RenderingContext,  binding: Binding) {
        this.children.forEach((child) => {
            child.render(gl, binding);
        });
    }
}
