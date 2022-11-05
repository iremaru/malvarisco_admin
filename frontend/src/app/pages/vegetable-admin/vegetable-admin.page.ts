import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IVegetablePart } from 'src/app/interfaces/IVegetablePart';
import { VegetablePartCRUDService } from '../../services/vegetable-part-crud.service';

@Component({
  selector: 'app-vegetable-admin',
  templateUrl: './vegetable-admin.page.html',
  styleUrls: ['./vegetable-admin.page.scss'],
})
export class VegetableAdminPage implements OnInit {

  showVegetablePartSection: boolean;
  showVegetableAssetsSection: boolean;
  vegetablePart: IVegetablePart[] = [];

  constructor(
    private vegetablePartService: VegetablePartCRUDService,
    private alertController: AlertController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.getAllVegetableParts();
  }

  ionViewDidEnter() {
    this.getAllVegetableParts();
  }

  //#region VEGETABLE PART

    getAllVegetableParts() {
      this.vegetablePartService.getVegetableParts().subscribe(
        resp => { this.vegetablePart = resp as IVegetablePart[]; }
      );
    }

    removePart(vegetablePart){
        this.vegetablePartService.deleteVegetablePart(vegetablePart.id)
        .subscribe(() => {
            this.ionViewDidEnter();
          }
        );
    }

    updatePart(vegetablePart) {
      this.vegetablePartService
        .updateVegetablePart(vegetablePart.id, vegetablePart).subscribe();
    }

    async askDeleteConfirmation(vegetablePart) {
      const alert = await this.alertController.create({
        header: `Eliminar ${vegetablePart.name}`,
        subHeader: 'Esta acción es irreversible',
        message: `¿Está segura/o de que quiere eliminar ${vegetablePart.name}?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Sí',
            role: 'destructive',
            handler: () => this.removePart(vegetablePart),
          },
        ],
      });
  
      await alert.present();
    }

    async updateVegetablePart(vegetablePart) {
      const alert = await this.alertController.create({
        header: `Modificar ${vegetablePart.name}`,
        inputs: [
          {
            name: 'name',
            placeholder: vegetablePart.name,
            value: vegetablePart.name,
          },
          {
            label: 'Descripción',
            name: 'description',
            placeholder: vegetablePart.description,
            value: vegetablePart.description
          },
          {
            name: 'examples',
            placeholder: vegetablePart.examples,
            value: vegetablePart.examples,
          },
        ],
        buttons: [
          {
            text: 'Actualizar',
            role: 'confirm',
            handler: ( data ) => {
              if( data.name !== '')
              {
                vegetablePart.name = data.name;
                vegetablePart.description = data.description;
                vegetablePart.examples = data.examples;
                this.updatePart(vegetablePart);
              } else {
                this.presentToastFieldRequired('middle', 'nombre');
                return false;
              }
            },
          },
        ],
      });
  
      await alert.present();
    }

  //#endregion

  //#region VEGETABLE

  //#endregion

  async presentToastFieldRequired(position: 'top' | 'middle' | 'bottom', textRequired: string) {
    const toast = await this.toastController.create({
      message: `Por favor, rellene el ${textRequired} para modificar.`,
      duration: 1500,
      position
    });
    await toast.present();
  }
}
