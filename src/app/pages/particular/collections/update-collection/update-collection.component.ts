import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../../../../core/service/collection.service';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-update-collection',
  standalone: true,
  templateUrl: './update-collection.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {
  collectionForm!: FormGroup;
  wasteTypes: string[] = ["Plastic", "Glass", "Paper", "Metal"];
  collectionId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private collectionService: CollectionService
  ) {
    this.collectionForm = this.formBuilder.group({
      particularId: [''],
      wasteType: this.formBuilder.array([], Validators.required),
      photo: [],
      estimatedWeight: [null, [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      collectionTime: ['', Validators.required],
      notes: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id')!;

    this.collectionService.getCollectionById(this.collectionId).subscribe(collection => {
      if (collection) {
        this.collectionForm.patchValue(collection);

        const wasteTypeArray = this.collectionForm.get('wasteType') as FormArray;
        collection.wasteType.forEach((type: string) => {
          wasteTypeArray.push(this.formBuilder.control(type));
        });
      }
    });
  }

  get wasteTypeArray() {
    return this.collectionForm.get('wasteType') as FormArray;
  }

  onMultipleWasteTypeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.wasteTypeArray.push(this.formBuilder.control(inputElement.value));
    } else {
      const index = this.wasteTypeArray.controls.findIndex(control => control.value === inputElement.value);
      if (index !== -1) {
        this.wasteTypeArray.removeAt(index);
      }
    }
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
        data => {
          console.log("Collection request updated:", data);
          this.router.navigate(['/collections']);
        },
        error => {
          console.error('Error updating request:', error);
        }
      );
    } else {
      console.log('Invalid form, please check the fields.');
    }
  }
}
