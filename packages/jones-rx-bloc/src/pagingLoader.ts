import {BehaviorSubject, combineLatest, distinct, EMPTY, filter, firstValueFrom, map, mergeMap, Observable, of, share, startWith, Subject} from "rxjs";
import {
  Complete,
  EmptyState,
  Failure,
  Progress,
  Result,
  Paging,
  Empty,
  EmptyLoading,
  HasContent, EmptyFailure, progressContentOrNull
} from "jones-ts";
import {pagingDataLoadBy, PagingDataLoader} from "./dataLoader/pagingDataLoader";

export class PagingLoader<ITEM, C extends Paging<ITEM>> {
  progress: Observable<Progress<Result<C>> | null>;
  isLoading: Observable<boolean>;
  paging: Observable<C>;
  listItems:  Observable<ITEM[]>;
  isHasMore: Observable<boolean>;
  emptyState: Observable<EmptyState>;

  private readonly _pagingTrigger = new Subject<PagingDataLoader.Operate>();
  private readonly _pagingLoad: Observable<Progress<Result<C>> | null>;
  private readonly _isRefreshing = new BehaviorSubject(false);
  private readonly _isLoadingMore = new BehaviorSubject(false);

  constructor(pagingDataLoader: (nextPage?: any) => Promise<Result<C>>) {
    this._pagingLoad = pagingDataLoadBy(this._pagingTrigger, pagingDataLoader).pipe(share(),startWith(null));

    this.progress = this._pagingLoad.pipe(distinct());
    this.isLoading = this.progress.pipe(
      map((progress) => progress != null && progress.isInProgress()),
      startWith(false),
    );

    this.paging = this._pagingLoad.pipe(
      mergeMap((progress) => {
        const paging = progress != null ? progressContentOrNull(progress) : null;
        return paging == null ? EMPTY : of(paging);
      })
    );

    this.listItems = this._pagingLoad.pipe(
      mergeMap((progress) => {
        const paging = progress != null ? progressContentOrNull(progress) : null;
        return paging == null ? EMPTY : of(paging.items);
      }),
      startWith([]),
    );

    this.isHasMore = this.paging.pipe(
      map((paging) => paging.nextPage != null),
      startWith(true),
    );

    this.emptyState = combineLatest([this._pagingLoad, this.listItems]).pipe(
      map(([progress, listItems]) => {
        if (listItems == null || listItems.length == 0) {
          if (progress != null && progress.isComplete()) {
            const result = (progress as Complete<Result<C>>).result;
            if (result?.isSuccess() == true) {
              return Empty.create();
            }
            const failure = result as Failure<C>;
            return EmptyFailure.create(failure?.message);
          }
          return EmptyLoading.create();
        }
        return HasContent.create();
      }),
      startWith(Empty.create()),
    );
  }

  private _load = async (type: PagingDataLoader.Type): Promise<Result<C>|null> => {
    this._pagingTrigger.next(PagingDataLoader.Operate.create(type));
    const progress = await firstValueFrom(
      this.progress.pipe(
        filter((p) => p != null && p.isComplete()),
      ),
    );
    return progress == null ? null : progress.resultOrNull();
  }

  refresh = async (): Promise<Result<C>|null> => {
    this._isRefreshing.next(true);
    try {
      return await this._load(PagingDataLoader.Type.Refresh);
    }
    finally {
      this._isRefreshing.next(false);
    }
  };

  loadMore = async (): Promise<Result<C>|null> => {
    this._isLoadingMore.next(true);
    try {
      return await this._load(PagingDataLoader.Type.LoadMore);
    }
    finally {
      this._isLoadingMore.next(false);
    }
  };

  get isRefreshing(): Observable<boolean> {
    return this._isRefreshing;
  }

  get isLoadingMore(): Observable<boolean> {
    return this._isLoadingMore;
  }
}
