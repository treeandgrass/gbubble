
type ListenerFn = (params: any) => void;

interface IListener {
    once: boolean;
    listener: ListenerFn;
}


export default class Event {
    private events: Map<string, IListener[]>;

    constructor() {
        this.events = new Map();
    }

    /**
     * register listener
     * @param eventName
     * @param listener
     */
    public on(eventName: string, listener: ListenerFn): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push({ listener, once: false });
    }

    /**
     * register function and evecute once
     * @param eventName
     * @param listener
     */
    public once(eventName: string, listener: ListenerFn): void {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push({ listener, once: true });
    }

    /**
     * emit event
     * @param eventName
     * @param params
     */
    public emit(eventName: string, params: any): void {
        const listeners: IListener[] = this.events.get(eventName);

        if (listeners && listeners.length > 0) {
            const notOnceListeners: IListener[] = [];

            listeners.forEach((oneOf: IListener) => {
                oneOf.listener(params);
                // keep not once execute listener
                if (!oneOf.once) {
                    notOnceListeners.push(oneOf);
                }
            });

            this.events.set(eventName, notOnceListeners);
        }
    }

    /**
     * del eventName from events
     * @param eventName
     * @param rmListener
     */
    public del(eventName: string, rmListener: ListenerFn) {
        const listeners: IListener[] = this.events.get(eventName);

        if (!listeners || listeners.length === 0) {
            return;
        }

        if (rmListener) {
            const newListeners: IListener[] = [];
            listeners.forEach((listener: IListener) => {
                if (listener.listener !== rmListener) {
                    newListeners.push(listener);
                }
            });

            this.events.set(eventName, newListeners);
        } else {
            this.events.set(eventName, []);
        }
    }
}
