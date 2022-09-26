import {from, map, Observable, startWith, switchMap} from "rxjs";
import {Complete, InProgress, Progress, Result} from "@jonests/core";

export namespace ContentDataLoader {
    export class Operate {
        static create(): Operate {
            return new Operate();
        }
    }
}

export function contentDataLoadBy<C>(trigger: Observable<ContentDataLoader.Operate>, contentDataLoader: () => Promise<Result<C>>)
    : Observable<Progress<Result<C>>> {
    return trigger.pipe(
        // filter((operate) => operate != null),
        switchMap(_=>
            from(contentDataLoader()).pipe(
                map((result) => Complete.create(result)),
                startWith(InProgress.create<Result<C>>())
            )
        )
    );
}
