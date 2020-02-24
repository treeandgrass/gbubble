import { GNode } from "../node/GNode";

export class Griphic extends GNode {
    public  render(gl: WebGLRenderingContext | WebGL2RenderingContext) {
        this.children.forEach((child) => {
            child.render(gl);
        });
    }
}
