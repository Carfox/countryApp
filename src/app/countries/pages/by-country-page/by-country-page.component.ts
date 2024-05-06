import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchByCountry(value: string) {
    this.isLoading = true;

    this.countryService.searchCountry(value).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
