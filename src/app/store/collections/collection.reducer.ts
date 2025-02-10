// src/app/store/collection/collection.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {loadCollections, loadCollectionsFailure, loadCollectionsSuccess} from "./collection.action";
import {Collection} from "../../model/collection";

export interface CollectionState {
  collections: Collection[];
  selectedCollection: Collection | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CollectionState = {
  collections: [],
  selectedCollection: null,
  loading: false,
  error: null};

export const collectionReducer = createReducer(
  initialState,
  on(loadCollections, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCollectionsSuccess, (state, { collections }) => ({
    ...state,
    collections,
    loading: false
  })),
  on(loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
)
