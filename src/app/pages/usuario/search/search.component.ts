import { Component, OnInit } from "@angular/core";
import { Trip } from "../../../shared/interfaces/trip.interface";
import { SearchService } from "../../../shared/services/search.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
    minDate: string = new Date().toISOString().split('T')[0];
    ciudades!: string[]
    selectedOrigin: string = ''
    selectedDestination: string = ''
    selectedDate: string = ''
    filterDestinos!: Trip[]
    filterCiudades!: string[]

    constructor(private searchService: SearchService){
        this.ciudades = this.searchService.Ciudades
    }

    ngOnInit(): void {
        const initialEvent = { target: { value: '' } }; // Simulando un evento vacío
        this.onSearchChange(initialEvent);
    }

    onSearchChange(event: any){
        const searchValue = event.target.value.toUpperCase()
        this.filterCiudades = this.ciudades.filter(c => 
          c.toUpperCase().includes(searchValue)
        )
    }

    onOriginChange(event: Event) {
        this.selectedOrigin = (event.target as HTMLInputElement).value
    }
    onDestinationChange(event: Event) {
        this.selectedDestination = (event.target as HTMLInputElement).value
    }
    onDateChange(event: Event) {
        this.selectedDate = (event.target as HTMLInputElement).value
    }

}