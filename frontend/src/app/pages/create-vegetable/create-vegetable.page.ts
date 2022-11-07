import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IVegetablePart } from 'src/app/interfaces/IVegetablePart';
import { PhotoService } from 'src/app/services/photo.service';
import { VegetableCRUDService } from 'src/app/services/vegetable-crud.service';
import { VegetablePartCRUDService } from 'src/app/services/vegetable-part-crud.service';

@Component({
  selector: 'app-create-vegetable',
  templateUrl: './create-vegetable.page.html',
  styleUrls: ['./create-vegetable.page.scss'],
})
export class CreateVegetablePage implements OnInit {

  vegetableForm: FormGroup;
  isSubmitted: boolean;
  capturedPhoto: string;

  vegetableParts: IVegetablePart[];

  constructor(
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private vegetableService: VegetableCRUDService,
    private zone: NgZone,
    private navController: NavController,
    private vegetablePartService: VegetablePartCRUDService
  ) { }

  get errorControl() {
    return this.vegetableForm.controls;
  }

  ionViewWillEnter() {
    this.vegetableForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = '';
  }

  ngOnInit() {
    this.vegetableForm = this.formBuilder.group({
      vegetableType: ['', [Validators.required]],
      vegetablePart: ['', [Validators.required]],
      description: [''],
      image: [''],
    });
    //this.dataPoblator.poblateVegetableParts(this.vegetableParts);
    this.getAllVegetableParts();
  }

  //#region VEGETABLE PART
  getAllVegetableParts() {
    this.vegetablePartService.getVegetableParts().subscribe(
      resp => {
        this.vegetableParts = [];
        resp.forEach(part => {
          this.vegetableParts.push({
            id: part.id,
            name: part.name.charAt(0).toUpperCase() + part.name.slice(1) ,
            description: part.description,
            examples: part.examples
          });
        });
      }
    );
  }
   //#endregion

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;

    if (!this.vegetableForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }

    let blob: Blob;

    if (this.capturedPhoto !== '') {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    this.vegetableService.createVegetable(this.vegetableForm.value, blob).subscribe(response => {
      console.log('Photo sent!');
      //this.router.navigateByUrl('/');
      this.zone.run(() => {
        this.vegetableForm.reset();
        this.navController.back();
      });
    });
  }
}
