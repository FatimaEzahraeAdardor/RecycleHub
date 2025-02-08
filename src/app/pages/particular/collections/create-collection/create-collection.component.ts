import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { CollectionService } from "../../../../core/service/collection.service";
import { ReactiveFormsModule } from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent {
  collectionForm: FormGroup;
  wasteTypes: string[] = ["Plastique", "Verre", "Papier", "Métal"];

  constructor(private formBuilder: FormBuilder, private collectionService: CollectionService, private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const particularId = currentUser?.id || null;
    this.collectionForm = this.formBuilder.group({
      particularId: [particularId],
      wasteType: this.formBuilder.array([], Validators.required),
      photo: [], // Array for multiple images
      estimatedWeight: [null, [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      collectionTime: ['', Validators.required],
      notes: [''],
      status:['pending']
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
    if (!this.collectionForm.value.particularId) {
      console.log("Utilisateur non identifié.");
      return;
    }

    if (this.collectionForm.valid) {
      this.collectionService.collectionRequest(this.collectionForm.value).subscribe(
        data => {
          console.log("Collection request submitted:", data);
          this.router.navigate(['/collections']);
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
