import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore = {
    byCapital :   { term: '', countries: [] },
    byCountries : { term: '', countries: [] },
    byRegion :    { region: '', countries: [] },
  }
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ))
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

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
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { term, countries } ),
      tap( () =>  this.saveToLocalStorage() )
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );;
  }

  seearchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${term}`
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region: term, countries } ),
      tap( () =>  this.saveToLocalStorage() )

    );;
  }
}
