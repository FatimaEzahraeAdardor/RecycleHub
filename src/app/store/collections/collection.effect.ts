// src/app/store/collection/collection.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {CollectionService} from "../../core/service/collection.service";
import {loadCollections, loadCollectionsFailure, loadCollectionsSuccess} from "./collection.action";

@Injectable()
export class CollectionEffects {
  constructor(
    private actions$: Actions,
    private collectionService: CollectionService
  ) {}

  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCollections),
      mergeMap(action =>
        this.collectionService.getCollectionsByParticular(action.particularId).pipe(
          map(collections => loadCollectionsSuccess({ collections })),
          catchError(error => of(loadCollectionsFailure({ error })))
        )
      )
    )
  );
}
