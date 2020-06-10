import { Binding } from "../backend/binding";
import { GNode } from "../node/GNode";
import { IRenderingContext } from "../types";

export class Graphic extends GNode {
    public  render( context: IRenderingContext,  binding: Binding) {
        this.children.forEach((child) => {
            child.render(context, binding);
        });
    }
}
