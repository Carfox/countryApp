import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURL: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  private getCountriesRequest( url: string): Observable<Country[]> {
    return this.http.get<Country[]>( url )
                    .pipe(
                      catchError( ()  => of([]) ),
                      // delay( 2000 )
                    );

   //tap((countries) => console.log('Paso por el tap', countries)),//Tap es una accion alternativa que retorna
  //Catch atrapa el error y of() retorna una alternativa planetada por nosotros
  }

  seerchCountryByAlphaCode( code: string ): Observable<Country | null> {
     return this.http
       .get<Country[]>(`${this.apiURL}/alpha/${code}`)
       .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError((error) => of(null)));
  }
  searchCaptital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesRequest(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesRequest(url);
  }

  seearchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${term}`
    return this.getCountriesRequest(url);
  }
}
