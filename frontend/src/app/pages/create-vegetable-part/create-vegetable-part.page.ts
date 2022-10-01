import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VegetablePartCRUDService } from '../../services/vegetable-part-crud.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-vegetable-part',
  templateUrl: './create-vegetable-part.page.html',
  styleUrls: ['./create-vegetable-part.page.scss'],
})
export class CreateVegetablePartPage implements OnInit {

  vegetablePartForm: FormGroup;

  constructor(
    private router: Router,
    private navController: NavController,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private vegetablePartCRUDservice: VegetablePartCRUDService
    ) {
    this.vegetablePartForm = this.formBuilder.group({
      name: [''],
      description: [''],
      examples: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.vegetablePartForm.valid) {
      return false;
    } else {
      this.vegetablePartCRUDservice.createVegetablePart(this.vegetablePartForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.vegetablePartForm.reset();
            this.navController.back();
          });
        });
    }
  }
}
