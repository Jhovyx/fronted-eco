import { Component, AfterViewInit, OnInit  } from "@angular/core";
import Glider from 'glider-js';
import { PromocionesService } from "../../../shared/services/promociones .service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit {

  constructor(private promocionesService: PromocionesService){
    this.ciudades = this.promocionesService.Ciudades
    this.destinos = this.promocionesService.Detinos
    this.filteredDestinos = this.destinos
  }

  minDate: string = new Date().toISOString().split('T')[0];
  destinos: any[] = [];
  filteredDestinos: any[] = [];
  filteredCiudades: string[] = [];
  ciudades: string[] = [];
  selectedOrigin: string = '';
  selectedDestination: string = '';
  selectedDate: string = '';
  ngOnInit(): void {
    const initialEvent = { target: { value: '' } }; // Simulando un evento vacío
    this.onSearchChange(initialEvent);
  }
  onSearchChange(event: any){
    const searchValue = event.target.value.toUpperCase()
    this.filteredCiudades = this.ciudades.filter(c => 
      c.toUpperCase().includes(searchValue)
    )
    this.filteredDestinos = this.destinos.filter(destino => 
      destino.name.toUpperCase().includes(searchValue)
    );
  }

  onOriginChange(event: Event) {
    this.onSearchChange(event)
    this.selectedOrigin = (event.target as HTMLInputElement).value;
    if(!this.selectedOrigin) return
    if(this.ciudades.includes(this.selectedOrigin)){
      console.log('hola')
    }else return
  }

  onDestinationChange(event: Event) {
    this.onSearchChange(event)
    this.selectedDestination = (event.target as HTMLInputElement).value
    if(!this.selectedDestination) return
    if(this.ciudades.includes(this.selectedDestination)){
      console.log('hola')
    }else return
  }

  onDateChange(event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    if(!this.selectedDate) return
    if(this.ciudades.includes(this.selectedDate)){
      console.log('hola')
    }
  }

  //promociones
  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('.carousel__lista') as HTMLElement | null;

    if (carouselElement) {
      new Glider(carouselElement, {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: '.carousel__indicadores',
        arrows: {
          prev: '.carousel__anterior',
          next: '.carousel__siguiente'
        },
        responsive: [
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }
        ]
      });
    } else {
      console.error('Carousel element not found');
    }
  }

}
