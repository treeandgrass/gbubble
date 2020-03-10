import { Binding } from "src/backend/binding";
import { GNode } from "../node/GNode";
import { IRenderingContext } from "../types";

export class Griphic extends GNode {
    public  render( context: IRenderingContext,  binding: Binding) {
        this.children.forEach((child) => {
            child.render(context, binding);
        });
    }
}
