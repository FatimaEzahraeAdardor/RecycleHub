import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from "../../../../model/collection";
import {CollectionService} from "../../../../core/service/collection.service";
import {selectCollections, selectError, selectLoading} from "../../../../store/collections/collection.selector";
import {loadCollections} from "../../../../store/collections/collection.action";

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collections$: Observable<Collection[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  particularId: string | null = null;
  disableCreateRequestButton: boolean = false;

  constructor(private store: Store, private collectionService: CollectionService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.particularId = currentUser?.id || null;

    // Use selectors to get state
    this.collections$ = this.store.select(selectCollections);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    if (this.particularId) {
      this.store.dispatch(loadCollections({ particularId: this.particularId }));
    } else {
      console.warn('No particular ID found.');
    }

    // Check pending requests whenever collections change
    this.collections$.subscribe(collections => this.checkPendingRequests(collections));
  }

  checkPendingRequests(collections: Collection[]) {
    const notValidatedOrRejectedCount = collections.filter(collection =>
      collection.status !== 'validated' && collection.status !== 'rejected'
    ).length;

    if (notValidatedOrRejectedCount >= 3) {
      this.disableCreateRequestButton = true;
    } else {
      this.disableCreateRequestButton = false;
    }
  }

  deleteCollection(collectionId: string, status: string): void {
    if (status !== 'pending') {
      alert('You can only delete collections with "pending" status.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this collection?');
    if (confirmDelete) {
      this.collectionService.deleteCollection(collectionId).subscribe({
        next: (response) => {
          this.store.dispatch(loadCollections({ particularId: this.particularId! }));
          console.log('Collection deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error while deleting the collection:', error);
        }
      });
    }
  }
}
