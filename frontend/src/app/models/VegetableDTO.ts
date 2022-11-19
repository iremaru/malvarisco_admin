
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

    static convertFromIVegetable(item: IVegetable, vegetablePartList: IVegetablePart[]): VegetableDTO {
        return {
            id: item.id,
            vegetableType: {
                vegetableTypeID: item.specieTypeID,
                specie: null,
                name: null
            },
            vegetablePart: vegetablePartList.find(part => part.id === item.vegetablePartID),
            name: 'Planta',
            description: item.description,
            imageName: item.imageName ? item.imageName : 'sample.webp'
        };
    }

    static convertIntoIVegetable(item: VegetableDTO): IVegetable {
        return {
            id: item.id,
            specieTypeID: item.vegetableType.vegetableTypeID,
            vegetablePartID: item.vegetablePart.id,
            description: item.description,
            imageName: item.imageName
        } ;
    }
}

