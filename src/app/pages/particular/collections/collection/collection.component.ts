import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CollectionService } from "../../../../core/service/collection.service";
import { Collection } from "../../../../model/collection";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collections: Collection[] = [];
  particularId: string | null = null;

  constructor(private collectionService: CollectionService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.particularId = currentUser?.id || null;
  }

  ngOnInit(): void {
    if (this.particularId) {
      this.getCollections();
    } else {
      console.warn('No particular ID found.');
    }
  }

  getCollections() {
    this.collectionService.getCollectionsByParticular(this.particularId!).subscribe({
      next: (data) => this.collections = data,
      error: (err) => console.error('Error while fetching collections:', err)
    });
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
          this.collections = this.collections.filter(collection => collection.id !== collectionId);
          console.log('Collection deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error while deleting the collection:', error);
        }
      });
    }
  }

  updateCollection(collectionId: string): void {
    console.log('Update collection with ID:', collectionId);
  }
}
