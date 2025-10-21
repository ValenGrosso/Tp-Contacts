import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Contact } from '../../interfaces/contact';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contact: Contact | undefined;
  loadingContact = false;
  router = inject(Router);

  async ngOnInit() {
    if(this.idContacto()){
      this.contact = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if(!this.contact) this.loadingContact = true;
      const res = await this.contactService.getContactByID(this.idContacto());
      if(res) this.contact = res;
      this.loadingContact = false;
    }
  }

  async toggleFavorite(){
    if(this.contact){
      const res = await this.contactService.setFavourite(this.contact.id);
      if(res) this.contact.isFavorite = !this.contact.isFavorite;
    }
  }

  async deleteContact(){
    if(this.contact){
      const res = await this.contactService.deleteContact(this.contact.id);
      if(res) this.router.navigate(['/']);
    }
  }
}