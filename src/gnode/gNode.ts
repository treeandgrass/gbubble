import { mat4, vec3 } from "gl-matrix";
import { Renderer } from "../backend";
import { NODE_TYPE } from "../constants";
import { Event } from "../events";
import { uuid } from "../utils";

export class GNode extends Event {
    public uuid: string;
    public type: string;
    private renderers: Renderer[];
    private children: GNode[];
    private position: vec3;
    private modelMatrix: mat4;
    private parentModelMatrix: mat4;
    private vertexs: Float32Array;

    constructor() {
        super();

        this.type = NODE_TYPE;
        this.uuid = uuid();
        this.renderers = [];
        this.children = [];
        this.position = vec3.create();
        this.modelMatrix = mat4.create();
        this.vertexs = new Float32Array();
        this.parentModelMatrix = mat4.create();
    }

    public render() {
        const modelMatrix: mat4 = mat4.create();
        mat4.multiply(modelMatrix, this.parentModelMatrix, this.modelMatrix);
        this.children.forEach((child: GNode) => {
            child.visit(this.renderers);
            child.setParentModelMatrix(modelMatrix);
            child.render();
        });

        // render current node vertex
        this.renderers.forEach((rr: Renderer) => {
            rr.attachPositionBuffer(this.vertexs);
        });
    }

    /**
     * set renderers for nodes
     * @param renderers
     */
    public visit(renderers: Renderer | Renderer[]) {
        const tempMap: Map<string, Renderer> =
            this.renderers.reduce((acc: Map<string, Renderer>, rr) => {
                acc.set(rr.uuid, rr);
                return acc;
            }, new Map());

        if (!(renderers instanceof Array)) {
            renderers = [ renderers ];
        }
        renderers.forEach((rr: Renderer) => {
            if (!tempMap.has(rr.uuid)) {
                tempMap.set(rr.uuid, rr);
            }
        });

        this.renderers = Array.from(tempMap.values());
    }

    /**
     * update model matrix
     * @param modelMatrix
     */
    public setParentModelMatrix(modelMatrix: mat4) {
        this.modelMatrix = modelMatrix;
    }
}
