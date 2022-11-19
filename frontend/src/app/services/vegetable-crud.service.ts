import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVegetable } from '../interfaces/IVegetable';

@Injectable({
  providedIn: 'root'
})
export class VegetableCRUDService {

  endpoint = 'http://localhost:8088/api/vegetables/';

  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private httpClient: HttpClient) { }

  getVegetables = (): Observable<IVegetable[]> => this.httpClient.get<IVegetable[]>(this.endpoint);

  createVegetable(vegetable: IVegetable, photo: Blob): Observable<any> {
    const formData = new FormData();
    formData.append( 'specieTypeID', vegetable.specieTypeID.toString() );
    formData.append( 'vegetablePartID', vegetable.vegetablePartID.toString() );
    formData.append( 'description', vegetable.description );
    formData.append( 'file', photo );

    return this.httpClient.post<IVegetable>( this.endpoint, formData );
  }

  getVegetable(id: number): Observable<IVegetable> {
    return this.httpClient.get<IVegetable>(this.endpoint + id );
  }

  updateVegetable(id: number, vegetable: IVegetable): Observable<any> {
    return this.httpClient.put(this.endpoint + id, JSON.stringify( vegetable ) , this.httpOptions);
  }

  updateVegetablePhoto(id: number, vegetable: IVegetable, photo: Blob): Observable<any>{
    const formData = new FormData();
    formData.append( 'specieTypeID', vegetable.specieTypeID?.toString() );
    formData.append( 'vegetablePartID', vegetable.vegetablePartID.toString() );
    formData.append( 'description', vegetable.description );
    formData.append('file', photo);
    console.log('VEGETABLE SERVICE: ' + JSON.stringify( photo));
    return this.httpClient.put<IVegetable>(this.endpoint + id, formData);
  }

  deleteVegetable(id: number): Observable<IVegetable> {
    return this.httpClient.delete<IVegetable>(this.endpoint + '/' + id, this.httpOptions);
  }

}

