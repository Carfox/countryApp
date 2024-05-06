import { Component, EventEmitter, Output } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  constructor( private countryService: CountryService ) {

  }

  searchByCapital(term: any) {

    this.isLoading = true;
    this.countryService.searchCaptital( term )
        .subscribe( countries => {
            this.countries = countries;
            this.isLoading = false;
        });
  }
}
