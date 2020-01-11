import { BaseShader, IShader } from "./baseShader";
import { KeyShader } from "./keyShader";
import { LeafShader } from "./leafShader";
import { Program } from "./program";

export class ContainerShader extends BaseShader {
    private shaders: IShader[];

    constructor(program: Program, template: string, split: string | RegExp, name?: string) {
        super(program, name);

        this.shaders = [];
        this.preBuild(template, split);
        this.register();
    }

    // return full shader string template
    public build(): string {
        return this.shaders.reduce((acc, shader) => {
            return acc + shader.build();
        }, "");
    }

    /**
     * set main shader by type
     * @param type
     */
    public setMainShader(type: string = "v") {
        this.program.setMainShader(this.uuid, type);
    }

    /**
     * constructor leaf shader array
     * @param template
     * @param split
     */
    private preBuild(template: string, split: string | RegExp) {
        let match;
        let re: RegExp;
        const sliceIndexs: number[] = [];
        const subShaderKeys: string[] = [];

        if (split.constructor === RegExp) {
            split = split as RegExp;
            if (split.flags && split.flags.includes("g")) {
                re = split;
            } else {
                re = new RegExp(split.source, "g");
            }
        } else {
            re = RegExp(split, "g");
        }

        // tslint:disable-next-line: no-conditional-assignment
        while ((match = re.exec(template)) !== null) {
            if (match.length < 2) {
                throw new Error("shader is not true, don't get name");
            } else {
                subShaderKeys.push(match[1]);
                sliceIndexs.push(match.index);
                sliceIndexs.push(match.index + match[0].length);
            }
        }

        sliceIndexs.unshift(0);
        sliceIndexs.push(template.length);

        for (let i = 0, keyIndex = 0; i < sliceIndexs.length; i += 2) {
            const chunk = template.slice(sliceIndexs[i], sliceIndexs[i + 1]);
            this.shaders.push(new LeafShader(this.program, chunk));

            if (keyIndex < subShaderKeys.length) {
                this.shaders.push(new KeyShader(this.program, subShaderKeys[keyIndex]));
                keyIndex++;
            }
        }
    }

}
