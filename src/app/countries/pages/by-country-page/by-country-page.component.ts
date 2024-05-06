import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) {}

  searchByCountry(value: string) {
  this.isLoading = true;

    this.countryService.searchCountry(value).subscribe((countries) => {
      this.countries = countries;
          this.isLoading = false;

    });
  }
}
