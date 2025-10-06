import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Form, FormGroup, FormsModule, NgControl, NgForm, NgModel } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');

  async ngOnInit() {
    if (this.idContacto()) {
        this.contactoOriginal = await this.contactsService.getContactByID(this.idContacto()!)
        // Cambio los valores del formulario
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

  /** Revisa si estamos editando o creando un contacto y ejecuta la función correspondiente */
  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
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
    // const res = await this.contactsService.createContact(nuevoContacto);
  if(this.idContacto()){
    res = await this.contactsService.editContact({...nuevoContacto,id:this.idContacto()!.toString()})
  } else {
    res = await this.contactsService.createContact(nuevoContacto);
  }

    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);
  }
}