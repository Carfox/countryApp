import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region;
  public isLoading: Boolean = false;

  constructor(private countryService: CountryService) {}

  searchByRegion(term: Region): void {
    this.isLoading = true;
    this.selectedRegion = term;
    this.countryService.seearchRegion(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
