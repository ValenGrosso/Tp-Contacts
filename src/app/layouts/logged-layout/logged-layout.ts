import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {

  authService = inject(AuthService);

  // Abre modal de pregunta de cerrar sesión
  openLogoutModal() {
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonText: "Cancelar",
      denyButtonText: `Cerrar sesión`
    })  .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isDenied) { //Reviso que haya clickeado el botón rojo
            this.authService.logout;
          }
        });
  }

}
