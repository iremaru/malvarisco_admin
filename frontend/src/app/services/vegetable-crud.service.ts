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

  createVegetable(vegetable: IVegetable, foto: Blob): Observable<any> {
    const formData = new FormData();
    formData.append( 'specieTypeID', vegetable.vegetableType.toString() );
    formData.append( 'vegetablePartID', vegetable.vegetablePart.toString() );
    formData.append( 'description', vegetable.description );
    formData.append( 'file', foto );

    return this.httpClient.post<IVegetable>( this.endpoint, formData );
  }

  getVegetable(id: number): Observable<IVegetable> {
    return this.httpClient.get<IVegetable>(this.endpoint + id );
  }

  updateVegetable(id: number, vegetable: IVegetable): Observable<any> {
    return this.httpClient.put(this.endpoint + id, JSON.stringify( vegetable ) , this.httpOptions);
  }

  deleteVegetable(id: number): Observable<IVegetable> {
    return this.httpClient.delete<IVegetable>(this.endpoint + '/' + id, this.httpOptions);
  }

}

