import {from, map, Observable, startWith, switchMap, takeWhile, tap} from "rxjs";
import {Paging, Progress, Result, Success} from "jones-ts";

export namespace PagingDataLoader {
    export enum Type {
        ReLoad, LoadNext
    }

    export class Operate {
        type: Type;

        constructor(type: Type) {
            this.type = type;
        }

        static create(type: Type): Operate {
            return new Operate(type);
        }
    }

    export class Option {
        nextPage?: any;

        constructor(nextPage?: any) {
            this.nextPage = nextPage;
        }

        static create(nextPage: any): Option {
            return new Option(nextPage);
        }
    }
}

export function pagingDataLoadBy<ITEM, C extends Paging<ITEM>>(trigger: Observable<PagingDataLoader.Operate>, pagingDataLoader: (nextPage?: any) => Promise<Result<C>>)
    : Observable<Progress<Result<C>>> {
    let nextPage: any;
    let isNotMore = false;
    let pagingLoaderOperate: PagingDataLoader.Operate;
    let lastListItems: ITEM[] = [];
    return trigger.pipe(
        takeWhile((operate) => !isNotMore || operate.type == PagingDataLoader.Type.ReLoad),
        tap((pagingLoadOperate) => pagingLoaderOperate = pagingLoadOperate),
        map((operate) => operate.type == PagingDataLoader.Type.LoadNext ? PagingDataLoader.Option.create(nextPage) : PagingDataLoader.Option.create(null)),
        switchMap((option) => from(pagingDataLoader(option.nextPage)).pipe(
            map((result) => {
                if (result instanceof Success) {
                    const paging = result.data;
                    nextPage = paging.nextPage;
                    isNotMore = nextPage == null;
                    if (pagingLoaderOperate?.type == PagingDataLoader.Type.LoadNext) {
                        lastListItems = [...lastListItems, ...paging.items];
                    } else {
                        lastListItems = paging.items;
                    }
                    paging.items = lastListItems;
                }
                return result;
            }),
            map((result) => Progress.Complete(result)),
            startWith(Progress.InProgress<Result<C>>())
        )),
    );
}