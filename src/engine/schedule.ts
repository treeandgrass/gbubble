import Scene from "./scene";

export default class Schedule {
    public scene: Scene;
    constructor(scene?: Scene) {
        if (this.scene) {
            this.scene = scene;
        } else {
            this.scene = new Scene(window.innerWidth, window.innerHeight);
        }
    }

    public start() {
        this.run();
    }

    public run() {
        this.scene.render();
    }

    public stop() {
        this.scene.close();
    }
}
