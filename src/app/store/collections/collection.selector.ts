// src/app/store/collection/collection.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CollectionState } from './collection.reducer';

export const selectCollectionState = createFeatureSelector<CollectionState>('collection');

export const selectCollections = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collections
);

export const selectSelectedCollection = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.selectedCollection
);

export const selectLoading = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.loading
);

export const selectError = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.error
);
