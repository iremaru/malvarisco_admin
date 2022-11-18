import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController, ToastController } from '@ionic/angular';
import { IVegetable } from 'src/app/interfaces/IVegetable';
import { IVegetablePart } from 'src/app/interfaces/IVegetablePart';
import { VegetableDTO } from 'src/app/models/VegetableDTO';
import { PhotoService } from 'src/app/services/photo.service';
import { VegetableCRUDService } from 'src/app/services/vegetable-crud.service';
import { VegetablePartCRUDService } from '../../services/vegetable-part-crud.service';
import { UpdateVegetablePhotoPage } from '../update-vegetable-photo/update-vegetable-photo.page';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-vegetable-admin',
  templateUrl: './vegetable-admin.page.html',
  styleUrls: ['./vegetable-admin.page.scss'],
})
export class VegetableAdminPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  showVegetablePartSection: boolean;
  showVegetableAssetsSection: boolean;
  showFarmSection: boolean;
  vegetableParts: IVegetablePart[] = [];
  vegetables: VegetableDTO[] = [];

  capturedPhoto: string;

  constructor(
    private vegetablePartService: VegetablePartCRUDService,
    private vegetableService: VegetableCRUDService,
    private alertController: AlertController,
    private toastController: ToastController,
    private photoService: PhotoService,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.getAllVegetableParts();
    this.getAllVegetables();
  }

  ionViewDidEnter() {
    this.getAllVegetableParts();
    this.getAllVegetables();
  }

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

  async askDeletePartConfirmation(itemToDelete) {
    const alert = await this.alertController.create({
      header: `Eliminar ${itemToDelete.name}`,
      subHeader: 'Esta acción es irreversible',
      message: `¿Está segura/o de que quiere eliminar ${itemToDelete.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sí',
          role: 'destructive',
          handler: () => this.removePart(itemToDelete),
        },
      ],
    });
  }

  getAllVegetables() {
    let response: IVegetable[];
    this.vegetableService.getVegetables().subscribe(resp => {
      console.log( JSON.stringify( resp ));

      this.vegetables = [];
      resp.forEach(item => {
        this.vegetables.push({
          id: item.id,
          vegetableType: {
            vegetableTypeID: item.vegetableType,
            specie: null,
            name: null
          },
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
      header: `Modificar ${vegetable.description}`,
      inputs: [
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
            if( data.description !== '')
            {
              vegetable.description = data.description;
              this.updateVegetable(vegetable);
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
  async askDeleteVegetableConfirmation(itemToDelete) {
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
          handler: () => this.removeVegetable(itemToDelete),
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
  openModal(event: Event, vegetable: VegetableDTO) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.submitPhoto(vegetable, ev.detail.data);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(vegetable: VegetableDTO) {
    this.modal.dismiss('hola', 'confirm');
    this.submitPhoto(vegetable, this.capturedPhoto);
  }

  async submitPhoto(vegetable: VegetableDTO, photo: string) {
    console.log( JSON.stringify( vegetable ));

    const updatedVegetable: IVegetable = {
      id: vegetable.id,
      vegetableType: vegetable.vegetableType?.vegetableTypeID,
      vegetablePart: vegetable.vegetablePart?.id,
      description: vegetable.description
    };

    const response = await fetch(photo) ;
    const blob = await response.blob();
    console.log('BLOB: ', JSON.stringify( blob ));

    this.vegetableService.updateVegetablePhoto(vegetable.id, updatedVegetable, blob);
    this.getAllVegetables();

  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

}
