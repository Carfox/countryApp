import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  public countries: Country[] = []

  constructor( private countryService: CountryService ){}

  searchByCountry( value: string ) {
    this.countryService.searchCountry(value)
        .subscribe(countries => {
          this.countries = countries
        })
  }

}
