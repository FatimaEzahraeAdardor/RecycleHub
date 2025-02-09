import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
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
  collectorAddress: string | null = null;
  collectorId: string;

  constructor(private collectionService: CollectionService,private router: Router,) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.collectorAddress = currentUser?.address || null;
    this.collectorId = currentUser?.id || null;
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections(): void {
    this.collectionService.getAllCollections().subscribe({
      next: (data) => {
        this.collections = data.filter(collection =>
          this.collectorAddress && collection.collectionAddress.includes(this.collectorAddress)
        );
      },
      error: (err) => console.error('Error while fetching collections:', err)
    });
  }

  acceptCollectionRequest(collectionId: string) {
    this.collectionService.updateCollectionStatus(collectionId, 'occupied', this.collectorId).subscribe({
      next: () => {
        console.log('Collection request accepted and status set to occupied.');
        alert('You have accepted the request. The status is now "Occupied".');
        this.router.navigate(['/dashboardCollector/collections'])
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to accept the collection request.');
      }
    });
  }
  validateCollection(collectionId: string) {
    this.collectionService.updateCollectionStatus(collectionId, 'validated',this.collectorId).subscribe({
      next: () => {
        console.log('Collection request accepted and status set to validation.');
        alert('You have validated the request. The status is now "validated".');
        this.router.navigate(['/dashboardCollector/collections'])
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to validate the collection request.');
      }
    });
  }
  rejectCollection(collectionId: string) {
    this.collectionService.updateCollectionStatus(collectionId, 'rejected',this.collectorId).subscribe({
      next: () => {
        console.log('Collection request rejected and status set to rejected.');
        alert('You have rejected the request.');
        this.router.navigate(['/dashboardCollector/collections'])
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to rejected the collection request.');
      }
    });
  }
}
