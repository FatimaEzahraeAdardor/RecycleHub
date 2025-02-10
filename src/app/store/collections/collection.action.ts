// src/app/store/collection/collection.actions.ts
import { createAction, props } from '@ngrx/store';
import {Collection} from "../../model/collection";

export const loadCollections = createAction(
  '[Collection] Load Collections',
  props<{ particularId: string }>()
);

export const loadCollectionsSuccess = createAction(
  '[Collection] Load Collections Success',
  props<{ collections: Collection[] }>()
);

export const loadCollectionsFailure = createAction(
  '[Collection] Load Collections Failure',
  props<{ error: string }>()
);
