import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { CollectionService } from '../../../../core/service/collection.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {
  collectionForm: FormGroup;
  collectionId!: string;
  wasteTypes: { type: string, pointsPerKg: number }[] = [
    { type: "Plastic", pointsPerKg: 2 },
    { type: "Glass", pointsPerKg: 1 },
    { type: "Paper", pointsPerKg: 1 },
    { type: "Metal", pointsPerKg: 5 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private collectionService: CollectionService
  ) {
    this.collectionForm = this.formBuilder.group({
      particularId: [''],
      wasteItems: this.formBuilder.array([], Validators.required),
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      collectionTime: ['', Validators.required],
      notes: [''],
      status: ['pending'],
      photo: []
    });
  }

  ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.collectionId) {
      this.loadCollectionDetails();
    }
  }

  get wasteItemsArray() {
    return this.collectionForm.get('wasteItems') as FormArray;
  }

  loadCollectionDetails() {
    this.collectionService.getCollectionById(this.collectionId).subscribe(
      (data) => {
        this.collectionForm.patchValue({
          particularId: data.particularId,
          collectionAddress: data.collectionAddress,
          collectionDate: data.collectionDate,
          collectionTime: data.collectionTime,
          notes: data.notes,
          status: data.status,
        });

        this.wasteItemsArray.clear();
        data.wasteItems.forEach((item: any) => {
          this.wasteItemsArray.push(this.formBuilder.group({
            type: [item.type],
            weight: [item.weight, [Validators.required, Validators.min(1000)]]
          }));
        });
      },
      (error) => {
        console.error("Error loading collection details:", error);
      }
    );
  }

  addWasteType(type: string) {
    this.wasteItemsArray.push(this.formBuilder.group({
      type: [type],
      weight: [null, [Validators.required, Validators.min(1000)]]
    }));
  }

  removeWasteType(index: number) {
    this.wasteItemsArray.removeAt(index);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.collectionForm.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.collectionForm.valid) {
      this.collectionService.updateCollection(this.collectionId, this.collectionForm.value).subscribe(
        (response) => {
          console.log("Update successful:", response);
          this.router.navigate(['/dashboard/collections']);
        },
        (error) => {
          console.error("Error updating the collection request:", error);
        }
      );
    } else {
      console.log("Invalid form!");
    }
  }
}
