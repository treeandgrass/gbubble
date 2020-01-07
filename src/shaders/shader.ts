import Event from "../events/event";

export default class Shader extends Event {
    private shaders: Shader[];
    private template?: string;

    constructor(shaderTemplate: string = "") {
        super();

        this.shaders = [];
        this.template = shaderTemplate;
    }

    /**
     * build shader template
     */
    public build(): string {
        if (!this.template && this.shaders.length > 0) {
            this.template = this.shaders.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.build();
            }, "");
        }

        return this.template;
    }

    public addChildShader(child: Shader) {
        this.shaders.push(child);
    }

    public attachTemplate(template: string) {
        this.template = template;
    }
}
