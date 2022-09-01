import {map, Observable, scan, share, takeWhile, timer} from "rxjs";

export class Countdown {
    timer: Observable<number>;
    isCountingDown: Observable<boolean>;

    constructor(seconds: number) {
        this.timer = timer(0, 1000).pipe(
            scan((acc: number) => --acc, seconds),
            takeWhile((x: number) => x >= 0),
            share()
        );
        this.isCountingDown = this.timer.pipe(
            map((x: number) => x > 0),
        );
    }
}