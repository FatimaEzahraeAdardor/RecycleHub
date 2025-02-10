import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {collectionReducer} from "./store/collections/collection.reducer";
import {CollectionEffects} from "./store/collections/collection.effect";
import {provideEffects} from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptorsFromDi(),withFetch()),provideStore({ collection: collectionReducer })
    ,    provideEffects(CollectionEffects),

]
};
