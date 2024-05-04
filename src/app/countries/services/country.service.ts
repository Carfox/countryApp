import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURL: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  seerchCountryByAlphaCode( code: string ): Observable<Country | null> {
     return this.http
       .get<Country[]>(`${this.apiURL}/alpha/${code}`)
       .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError((error) => of(null)));

  }
  searchCaptital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiURL}/name/${term}`).pipe(
      catchError((error) => of([]))
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiURL}/name/${term}`).pipe(
      catchError((error) => of([]))
    );
  }

  seearchRegion(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiURL}/region/${term}`).pipe(
      //tap((countries) => console.log('Paso por el tap', countries)),//Tap es una accion alternativa que retorna
      catchError( () => of([])) //Catch atrapa el error y of() retorna una alternativa planetada por nosotros
    );
  }
}
