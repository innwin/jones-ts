import {combineLatest, distinct, EMPTY, filter, firstValueFrom, map, mergeMap, Observable, of, share, startWith, Subject} from "rxjs";
import {
  Empty,
  EmptyFailure,
  EmptyLoading,
  EmptyState,
  HasContent,
  Progress,
  progressContentOrNull,
  Result
} from "@jonests/core";
import {contentDataLoadBy, ContentDataLoader} from "./dataLoader/contentDataLoader";

export class ContentLoader<C> {
  progress: Observable<Progress<Result<C>> | null>;
  isLoading: Observable<boolean>;
  content: Observable<C|null>;
  emptyState: Observable<EmptyState>;

  private readonly _contentTrigger = new Subject<ContentDataLoader.Operate>();
  private readonly _contentLoad: Observable<Progress<Result<C>> | null>;

  constructor(contentDataLoader: () => Promise<Result<C>>) {
    this._contentLoad = contentDataLoadBy(this._contentTrigger, contentDataLoader).pipe(share(),startWith(null));

    this.progress = this._contentLoad.pipe(distinct());
    this.isLoading = this.progress.pipe(
      map((progress) => progress != null && progress.isInProgress()),
      startWith(false),
    );

    this.content = this._contentLoad.pipe(
      mergeMap((progress) => {
        const contentData = progress != null ? progressContentOrNull(progress) : null;
        return contentData == null ? EMPTY : of(contentData);
      }),
      startWith(null),
    );

    this.emptyState = combineLatest([this._contentLoad, this.content]).pipe(
      map(([progress, content]) => {
        if (content == null || (Array.isArray(content) && content.length == 0)) {
          if (progress != null && progress.isComplete()) {
            const result = progress.result;
            if (result?.isSuccess() == true) {
              return Empty.create();
            }
            return EmptyFailure.create(result?.message);
          }
          return EmptyLoading.create();
        }
        return HasContent.create();
      }),
      startWith(Empty.create()),
    );
  }

  refresh = async (): Promise<Result<C>|null> => {
    this._contentTrigger.next(ContentDataLoader.Operate.create());
    const progress = await firstValueFrom(
      this.progress.pipe(
        filter((p) => p != null && p.isComplete()),
      ),
    );
    return progress == null ? null : progress.resultOrNull();
  };
}
