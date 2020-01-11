import { IShader } from "./baseShader";
import { LeafShader } from "./leafShader";
import { Program } from "./program";

export class ContainerShader implements IShader {
    private shaders: IShader[];
    private program: Program;

    constructor(program: Program, template: string, split: string | RegExp) {
        this.program = program;
        this.shaders = [];
        this.preBuild(template, split);
    }

    // return full shader string template
    public build(): string {
        return this.shaders.reduce((acc, shader) => {
            return acc + shader.build();
        }, "");
    }

    /**
     * constructor leaf shader array
     * @param template
     * @param split
     */
    private preBuild(template: string, split: string | RegExp) {
        let re: RegExp;
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

        const sliceIndexs: number[] = [];
        const subShaderKeys: string[] = [];
        let match;
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
            this.shaders.push(new LeafShader(chunk));

            if (keyIndex < subShaderKeys.length) {
                this.shaders.push(this.program.enquiry(subShaderKeys[keyIndex]));
            }
        }
    }

}
