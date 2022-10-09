import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VegetablePartCRUDService } from '../../services/vegetable-part-crud.service';
import { AlertController, NavController } from '@ionic/angular';

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
    private vegetablePartCRUDservice: VegetablePartCRUDService,
    private alertController: AlertController
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
      this.presentInvalidFormAlert();
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

  async presentInvalidFormAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: 'Faltan campos obligatorios',
      message: 'No olvides rellenar todos los campos marcados con asteríscos.',
      buttons: ['Entendido'],
    });

    await alert.present();
  }
}
