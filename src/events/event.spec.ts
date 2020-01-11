import signale from "signale";
import { Event, ListenerFn } from "./event";

describe("test event class", () => {
    const event: Event = new Event();

    test("test on method", () => {
        const testData = { success: "on method" };
        event.on("on", (params: any) => {
            expect(params).toBe(testData);
            signale.debug("show multiple times");
        });

        event.emit("on", testData);
        event.emit("on", testData);
    });

    test("test once method", () => {
        const testData = { once: "once" };
        event.once("once", (params: any) => {
            expect(params).toBe(testData);
            signale.debug("only print once");
        });

        event.emit("once", testData);
        event.emit("once", testData);
    });

    test("test del method", () => {
        const testData = { data: {} };
        const listenerFn1: ListenerFn = (params: any) => {
            signale.debug("one, once");
        };
        const listenerFn2: ListenerFn = (params: any) => {
            signale.debug("two, twice");
        };

        const listenerFn3: ListenerFn = (params: any) => {
            signale.debug("three, twice");
        };
        event.on("del", listenerFn1);
        event.on("del", listenerFn2);
        event.on("del", listenerFn3);

        event.emit("del", testData);

        event.del("del", listenerFn1);

        event.emit("del", testData);

        event.del("del");

        event.emit("del", testData);
    });
});
