import { Component, OnInit } from "@angular/core";
import { Reserva } from "../../../shared/interfaces/reserva.interface";
import { ReservaService } from "../../../shared/services/reseva.service";
import { Router } from "@angular/router";
import { UserService } from "../../../shared/services/user.service";
import { User } from "../../../shared/interfaces/user.interface";
@Component({
  selector: 'app-reserva-management',
  templateUrl: './reserva-management.component.html',
  styleUrls: ['./reserva-management.component.css']
})
export class ReservationManagementComponent implements OnInit {

  user!: User

  ngOnInit(): void {
    this.loadUser();
  }

  constructor(private reservasService: ReservaService, private router: Router, private userService: UserService) {}

  reservas: Reserva[] = [];

  async loadReservasBiUser(id: string) {
    const reservas = await this.reservasService.findByIdUser(id);
    this.reservas = reservas ?? [];
  }

  async loadReservas() {
    const reservas = await this.reservasService.findAll();
    this.reservas = reservas ?? [];
  }

  loadUser(){
    const user = this.userService.getCookie('user');
    if(user){
      this.user = user;
      if(user.userType === 'admin'){
        this.loadReservas();
      }else{
        this.loadReservasBiUser(this.user.primaryKey)
      }
    }
  }

  pagar(reserva: Reserva){
    sessionStorage.setItem('reserva', JSON.stringify(reserva));
    this.router.navigate(['/pago-detalle']);
  }

}
