import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class GroupsPage {
  authService = inject(AuthService);
}
