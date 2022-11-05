
import { IVegetable } from '../interfaces/IVegetable';
import { VegetableTypeDTO } from './VegetableTypeDTO';

export class VegetableDTO {
    vegetableID: number;
    vegetableType: VegetableTypeDTO;
    vegetable: IVegetable;
    description: string;
    imageName: string;
}

