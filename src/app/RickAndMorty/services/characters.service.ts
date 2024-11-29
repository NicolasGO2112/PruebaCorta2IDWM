import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Welcome } from '../interfaces/ResponseApi_GetCharacterInformation';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl: string = "https://rickandmortyapi.com/api/character";

  private http = inject(HttpClient);

  public errors: string[] = []; 

  async getAllCharacters(page : number) : Promise<Welcome>
  {
    try{
      const queryParams = new HttpParams().set('page', page).toString();
      const response = await firstValueFrom(this.http.get<Welcome>(`${this.baseUrl}?${queryParams}`));
      return Promise.resolve(response);
    }catch(error){
      console.log(error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
    
  }
  async getCharacterByName(name: string): Promise<Welcome> {
    try{
      const queryParams = new HttpParams().set('name', name).toString();
      const response = await firstValueFrom(this.http.get<Welcome>(`${this.baseUrl}?${queryParams}`));
      return Promise.resolve(response);
    }catch(error){
      console.log("Error en getCharacterByName",error)
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
