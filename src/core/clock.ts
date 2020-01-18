export class Clock {
    private delta: number;

    constructor(delta?: number) {
        this.delta = delta;
    }

    public getTime(): number {
        return Date.now();
    }

    public getDelta(): number {
        return this.delta;
    }

    public setDelta(delta: number) {
        this.delta = delta;
    }
}
