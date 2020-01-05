export default class Scene {
    private canvas: HTMLCanvasElement;

    constructor(width: number, height: number) {
        this.canvas = document.createElement("canavs") as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public createWindow(element: HTMLElement | null) {
        if (element !== null) {
            element.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }
    }

    public render() {
        console.log("render");
    }

    public update() {
        console.log("update");
    }

    public close() {
        console.log("stop");
    }
}
