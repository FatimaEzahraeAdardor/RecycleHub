import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from "@angular/forms";
import { CollectionService } from "../../../../core/service/collection.service";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-create-collections',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  collectionForm: FormGroup;
  wasteTypes: { type: string, pointsPerKg: number }[] = [
    { type: "Plastique", pointsPerKg: 2 },
    { type: "Verre", pointsPerKg: 1 },
    { type: "Papier", pointsPerKg: 1 },
    { type: "Métal", pointsPerKg: 5 }
  ];


  constructor(
      private formBuilder: FormBuilder,
      private collectionService: CollectionService,
      private router: Router
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const particularId = currentUser?.id || null;

    this.collectionForm = this.formBuilder.group({
      particularId: [particularId],
      wasteItems: this.formBuilder.array([], Validators.required),
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      collectionTime: ['', Validators.required],
      notes: [''],
      status: ['pending'],
      photo:[]
    });
  }

  ngOnInit(): void {

  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get wasteItemsArray() {
    return this.collectionForm.get('wasteItems') as FormArray;
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
    if (!this.collectionForm.value.particularId) {
      console.log("Utilisateur non identifié.");
      return;
    }

    if (this.collectionForm.valid) {
      this.collectionService.collectionRequest(this.collectionForm.value).subscribe(
          data => {
            console.log("Collection request submitted:", data);
            this.router.navigate(['/dashboard/collections']);
          },
          error => {
            console.error('Error adding request:', error);
          }
      );
    } else {
      console.log('Formulaire invalide, veuillez vérifier les champs.');
    }
  }

}
