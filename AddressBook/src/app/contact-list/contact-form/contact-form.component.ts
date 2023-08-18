import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactService } from '../../service';
import { Contact } from '../../model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  addContactForm!: FormGroup;
  id: number = 0;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    if (this.id > 0) {
      this.contactService.getContactById(this.id).subscribe(result => {
        this.buildContactForm(new Contact(result));
      });
    }
    else {
      this.buildContactForm(new Contact({}));
    }
  }

  buildContactForm(contactDetail: Contact) {
    this.addContactForm = new FormGroup({
      name: new FormControl(contactDetail.name, Validators.required),
      email: new FormControl(contactDetail.email, [Validators.required, Validators.email]),
      mobile: new FormControl(contactDetail.mobile, [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      landline: new FormControl(contactDetail.landline),
      website: new FormControl(contactDetail.website),
      address: new FormControl(contactDetail.address)
    });
  }

  addContactDetail() {
    if (this.addContactForm.valid) {
      let contact = new Contact(this.addContactForm.value);
      if (this.id == 0) {
        this.contactService.addContact(contact).subscribe(() => { });
      }
      this.resetContactForm();     
    }
  }

  updateContactDetail() {
    if (this.addContactForm.valid) {
      let contact = new Contact(this.addContactForm.value);
      if (this.id > 0) {
        this.contactService.updateContact(this.id, contact).subscribe(() => { });
      }
      this.resetContactForm();
    }
  }

  resetContactForm(){
    this.addContactForm.reset({});
    this.closeModal();
    this.contactService.contactFormChanged();
  }

  closeModal() {
    this.router.navigate([`contact`]);
  }
}
