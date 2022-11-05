import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IVegetablePart } from '../interfaces/IVegetablePart';

@Injectable({
  providedIn: 'root'
})
export class VegetablePartCRUDService {

  endpoint = 'http://localhost:8088/api/vegetableParts/';

  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private httpClient: HttpClient) { }

  getVegetableParts =  (): Observable<IVegetablePart[]> => this.httpClient.get<IVegetablePart[]>(this.endpoint);

  createVegetablePart( vegetablePart: IVegetablePart): Observable<any> {
    return this.httpClient.post<IVegetablePart>( this.endpoint, vegetablePart );
  }


  getVegetablePart(id: number): Observable<IVegetablePart> {
    return this.httpClient.get<IVegetablePart>(this.endpoint + id );
  }

  updateVegetablePart(id: number, vegetablePart: IVegetablePart): Observable<any> {
    return this.httpClient.put(this.endpoint + id, JSON.stringify( vegetablePart ) , this.httpOptions);
  }
  // updateVegetablePart(id: number, vegetablePart: VegetablePart): Observable<any> {
  //   return this.httpClient.put(this.endpoint + id, JSON.stringify( {...vegetablePart} ) , this.httpOptions);
  // }

  deleteVegetablePart(id: number): Observable<IVegetablePart> {
    return this.httpClient.delete<IVegetablePart>(this.endpoint + '/' + id, this.httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result) ;
    };
  }
}
