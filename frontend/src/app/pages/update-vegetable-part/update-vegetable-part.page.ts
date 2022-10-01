import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VegetablePartCRUDService } from 'src/app/services/vegetable-part-crud.service';

@Component({
	selector: 'app-update-vegetable-part',
	templateUrl: './update-vegetable-part.page.html',
	styleUrls: ['./update-vegetable-part.page.scss'],
})
export class UpdateVegetablePartPage implements OnInit {
	updateVegetablePartFormGroup: FormGroup;
	id: any;

	constructor(
		private crudService: VegetablePartCRUDService,
		private activatedRoute: ActivatedRoute,
		public formBuilder: FormBuilder,
		private router: Router
	) {
		this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
	}

	ngOnInit() {
		this.fetchVegetablePart(this.id);
		this.updateVegetablePartFormGroup = this.formBuilder.group({
			name: [''],
			description: [''],
			examples: [''],
		});
	}

	fetchVegetablePart(id) {
		this.crudService.getVegetablePart(id).subscribe((data) => {
			this.updateVegetablePartFormGroup.setValue({
				name: data.name,
				description: data.description,
				examples: data.examples,
			});
		});
	}

	onSubmit() {
		if (!this.updateVegetablePartFormGroup.valid) {
			return false;
		} else {
			this.crudService
				.updateVegetablePart(this.id, this.updateVegetablePartFormGroup.value)
				.subscribe(() => {
					this.updateVegetablePartFormGroup.reset();
					this.router.navigate(['/vegetable-admin']);
				});
		}
	}
}
