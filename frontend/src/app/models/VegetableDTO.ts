
import { IVegetable } from '../interfaces/IVegetable';
import { IVegetablePart } from '../interfaces/IVegetablePart';
import { VegetableTypeDTO } from './VegetableTypeDTO';

export class VegetableDTO {
    id: number;
    vegetableType: VegetableTypeDTO;
    vegetablePart: IVegetablePart;

    /** vegetableType.specie.name + vegetableType.name  */
    name: string;
    description: string;
    imageName: string;
}

