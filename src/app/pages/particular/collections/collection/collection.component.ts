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
      console.warn('Aucun ID particulier trouvé.');
    }
  }

  getCollections() {
    this.collectionService.getCollectionsByParticular(this.particularId!).subscribe({
      next: (data) => this.collections = data,
      error: (err) => console.error('Erreur lors de la récupération des collectes :', err)
    });
  }
}
