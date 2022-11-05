import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IVegetable } from 'src/app/interfaces/IVegetable';
import { IVegetablePart } from 'src/app/interfaces/IVegetablePart';
import { VegetableDTO } from 'src/app/models/VegetableDTO';
import { VegetableCRUDService } from 'src/app/services/vegetable-crud.service';
import { VegetablePartCRUDService } from '../../services/vegetable-part-crud.service';

@Component({
  selector: 'app-vegetable-admin',
  templateUrl: './vegetable-admin.page.html',
  styleUrls: ['./vegetable-admin.page.scss'],
})
export class VegetableAdminPage implements OnInit {

  showVegetablePartSection: boolean;
  showVegetableAssetsSection: boolean;
  vegetableParts: IVegetablePart[] = [];
  vegetables: VegetableDTO[] = [];

  constructor(
    private vegetablePartService: VegetablePartCRUDService,
    private vegetableService: VegetableCRUDService,
    private alertController: AlertController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.getAllVegetableParts();
    this.getAllVegetables();
  }

  ionViewDidEnter() {
    this.getAllVegetableParts();
    this.getAllVegetables();
  }

  //#region VEGETABLE PART

    getAllVegetableParts() {
      this.vegetablePartService.getVegetableParts().subscribe(
        resp => {
          this.vegetableParts = [];
          resp.forEach(part => {
            this.vegetableParts.push({
              id: part.id,
              name: part.name,
              description: part.description,
              examples: part.examples
            });
          });

        }
        /* resp => {
          this.vegetableParts = resp;
        } */
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

    async triggerAlertUpdateVegetablePart(vegetablePart) {
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

  getAllVegetables() {
    let response: IVegetable[];
    this.vegetableService.getVegetables().subscribe(resp => {
      this.vegetables = [];
      resp.forEach(item => {
        this.vegetables.push({
          id: item.id,
          vegetableType: null, //item.vegetableType,
          vegetablePart: this.vegetableParts.find(part => part.id === item.vegetablePart),
          name: 'Nada',
          description: item.description,
          imageName: item.imageName? item.imageName : ''
        });
      });

    });
  }

  removeVegetable(vegetable: IVegetable){
      this.vegetableService.deleteVegetable(vegetable.id)
      .subscribe(() => {
          this.ionViewDidEnter();
        }
      );
  }

  updateVegetable(vegetable: VegetableDTO) {
    const vegetableUpdated: IVegetable = {
      id: vegetable.id,
      vegetableType: vegetable.vegetableType.vegetableTypeID,
      vegetablePart: vegetable.vegetablePart.id,
      description: vegetable.description,
    };

    if(vegetable.imageName) { vegetableUpdated.imageName = vegetable.imageName;}

    this.vegetableService
      .updateVegetable(vegetable.id, vegetableUpdated).subscribe();
  }

  async triggerAlertUpdateVegetable(vegetable: VegetableDTO) {
    const alert = await this.alertController.create({
      header: `Modificar ${vegetable.name}`,
      inputs: [
        {
          name: 'name',
          placeholder: vegetable.name,
          value: vegetable.name,
        },
        {
          label: 'Descripción',
          name: 'description',
          placeholder: vegetable.description,
          value: vegetable.description
        },
      ],
      buttons: [
        {
          text: 'Actualizar',
          role: 'confirm',
          handler: ( data ) => {
            if( data.name !== '')
            {
              vegetable.name = data.name;
              vegetable.description = data.description;
              this.updatePart(vegetable);
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


  async askDeleteConfirmation(itemToDelete) {
    const alert = await this.alertController.create({
      header: `Eliminar ${itemToDelete.name}`,
      subHeader: 'Esta acción es irreversible',
      message: `¿Está segura/o de que quiere eliminar ${itemToDelete.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Sí',
          role: 'destructive',
          handler: () => this.removePart(itemToDelete),
        },
      ],
    });

    await alert.present();
  }
  async presentToastFieldRequired(position: 'top' | 'middle' | 'bottom', textRequired: string) {
    const toast = await this.toastController.create({
      message: `Por favor, rellene el ${textRequired} para modificar.`,
      duration: 1500,
      position
    });
    await toast.present();
  }
}
