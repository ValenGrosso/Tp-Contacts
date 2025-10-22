import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Form, FormGroup, FormsModule, NgControl, NgForm, NgModel } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { SpinnerComponent } from "../../components/spinner/spinner";


@Component({
  selector: 'app-new-edit-contact',
  imports: [
    FormsModule,
    SpinnerComponent,
    RouterLink,
],
  templateUrl: './new-edit-contact.html',
  styleUrls: ['./new-edit-contact.scss']
})
export class NewEditContact {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;
contact: any;

  async ngOnInit() {
    if (this.idContacto()) {
        this.contactoOriginal = await this.contactsService.getContactByID(this.idContacto()!)
        this.form()?.setValue({
            firstName: this.contactoOriginal?.firstName,
            lastName: this.contactoOriginal?.lastName,
            address: this.contactoOriginal?.address,
            email: this.contactoOriginal?.email,
            image: this.contactoOriginal?.image,
            number: this.contactoOriginal?.number,
            company: this.contactoOriginal?.company,
            isFavourite: this.contactoOriginal?.isFavorite
        })
    }
  }

  async handleFormSubmission(form:NgForm){
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite
  }

  let res;
  this.isLoading = true;
  if(this.idContacto()){
    res = await this.contactsService.editContact({...nuevoContacto,id: Number(this.idContacto())})
    res = nuevoContacto
    this.router.navigate(["/contacts",res]);
  } else {
    res = await this.contactsService.createContact(nuevoContacto);
  }
  this.isLoading = false;   
  }
}