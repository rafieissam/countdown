export interface Timer {
    id: string;
    seconds: number;
    isPaused: boolean;
};

export class GlobalTimers {
    private static timers: Timer[] = [];

    static get(): Timer[] {
        return this.timers;
    }

    static getToStr(): string {
        return JSON.stringify(this.timers);
    }

    static set(timers: Timer[]) {
        this.timers = timers;
    }

    static setFromStr(timersStr: string) {
        this.timers = JSON.parse(timersStr);
    }
}