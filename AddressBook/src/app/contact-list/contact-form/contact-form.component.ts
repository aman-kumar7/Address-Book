import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef} from 'ngx-bootstrap/modal'

import { ContactService } from '../../service';
import { Contact } from '../../model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  addContactForm!: FormGroup;
  contactDetail!: Contact;
  public onSave: any;
  contactId!: number;

  constructor(private contactService: ContactService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private modalRef: BsModalRef
    ) {
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   this.id = params.id;
    // });

    // if (this.id > 0) {
    //   this.contactService.getContactById(this.id).subscribe(result => {
    //     this.buildContactForm(new Contact(result));
    //   });
    // }
    //else {
      this.buildContactForm();
    //}
  }

  buildContactForm() {
    this.addContactForm = new FormGroup({
      name: new FormControl(this.contactDetail?.name ?? '', Validators.required),
      email: new FormControl(this.contactDetail?.email ?? '', [Validators.required, Validators.email]),
      mobile: new FormControl(this.contactDetail?.mobile ?? '', [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      landline: new FormControl(this.contactDetail?.landline ?? ''),
      website: new FormControl(this.contactDetail?.website ?? ''),
      address: new FormControl(this.contactDetail?.address ?? '')
    });
  }

  addContactDetail() {
    if (this.addContactForm.valid) {
      let contact = new Contact(this.addContactForm.value);
      this.contactService.addContact(contact).subscribe(() => {
        this.resetContactForm();
        this.closeModal();
        this.onSave(true);
      });
    }
  }

  updateContactDetail() {
    if (this.addContactForm.valid) {
      let contact = new Contact(this.addContactForm.value);
        this.contactService.updateContact(this.contactId, contact).subscribe((data) => {
          this.resetContactForm();
          this.closeModal();
          this.onSave(data);
         });
    }
  }

  resetContactForm(){
    this.addContactForm.reset({});
    this.closeModal();
    this.contactService.contactFormChanged();
  }

  closeModal() {
    this.modalRef.hide();
    //this.router.navigate([`contact`]);
  }
}
