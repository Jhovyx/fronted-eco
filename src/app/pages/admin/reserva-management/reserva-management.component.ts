import { Component, OnInit } from "@angular/core";
import { Reserva } from "../../../shared/interfaces/reserva.interface";
import { ReservaService } from "../../../shared/services/reseva.service";


@Component({
  selector: 'app-reserva-management',
  templateUrl: './reserva-management.component.html',
  styleUrls: ['./reserva-management.component.css']
})
export class ReservationManagementComponent implements OnInit {

  ngOnInit(): void {
    this.loadReservas();
  }

  constructor(
    private reservasService: ReservaService
  ){}

  reservas: Reserva[] = []

  async loadReservas(){
    const reservas = await this.reservasService.findAll();
    this.reservas = reservas ?? [];
  }

}
