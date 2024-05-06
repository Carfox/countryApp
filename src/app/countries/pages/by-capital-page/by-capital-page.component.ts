import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue:string = '';

  constructor( private countryService: CountryService ) {

  }

  ngOnInit(): void {
    this.countries  = this.countryService.cacheStore.byCapital.countries
    this.initialValue = this.countryService.cacheStore.byCapital.term
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
