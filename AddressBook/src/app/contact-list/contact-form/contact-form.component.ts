import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef} from 'ngx-bootstrap/modal'

import { ContactService } from '../../service';
import { Contact } from '../../model';
import { NotificationService } from '../../shared';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  addContactForm!: UntypedFormGroup;
  contactDetail!: Contact;
  public onSave: any;
  contactId!: number;
  contactList: any;

  constructor(private contactService: ContactService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private modalRef: BsModalRef,
    private notificationService: NotificationService
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
      this.getContactList();      
    //}
  }

  getContactList(){
    this.contactService.getContactList().subscribe(result => {
      this.contactList = result;
      this.buildContactForm();
  });
  }

  buildContactForm() {
    this.addContactForm = new UntypedFormGroup({
      firstname: new UntypedFormControl(this.contactDetail?.firstname ?? '', Validators.required),
      lastname: new UntypedFormControl(this.contactDetail?.lastname ?? '', Validators.required),
      email: new UntypedFormControl(this.contactDetail?.email ?? '', [Validators.required, Validators.email, this.isEmailUnique.bind(this)]),
      mobile: new UntypedFormControl(this.contactDetail?.mobile ?? '', [Validators.required, Validators.pattern(/^[9876]\d{9}$/), this.isPhoneNumberUnique.bind(this)]),
      website: new UntypedFormControl(this.contactDetail?.website ?? ''),
      address: new UntypedFormControl(this.contactDetail?.address ?? ''),
      description: new UntypedFormControl(this.contactDetail?.description),
    });
  }

  addContactDetail() {
    if (this.addContactForm.valid) {
      let contact = new Contact(this.addContactForm.value);
      this.contactService.addContact(contact).subscribe((data) => {
        this.resetContactForm();
        this.closeModal();
        this.onSave(data);
        this.notificationService.success('Success' ,'Contact added successfully');
      }, (error) => {
          this.notificationService.error('Error' ,'Failed to add contact');   
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
          this.notificationService.success('Success' ,'Contact updated successfully');
      }, (error) => {
          this.notificationService.error('Error' ,'Failed to update contact');   
      });
    }
  }

  isEmailUnique(control: AbstractControl) {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    else {
      if(this.contactId) {
        return (this.contactList.filter((contact: Contact) => contact.id != this.contactId)).findIndex((f: any) => f.email.trim().toLowerCase() === value.trim().toLowerCase()) > -1 ? { duplicate: true } : null;
    }
      return this.contactList.findIndex((contact: Contact) => contact.email.trim().toLowerCase() === value.trim().toLowerCase()) > -1 ? { duplicate: true } : null;
    }
  }

  isPhoneNumberUnique(control: AbstractControl){
    if (!control.value) {
      return null;
    }
    else {
      if(this.contactId) {
        return (this.contactList.filter((contact: Contact) => contact.id != this.contactId)).findIndex((f: any) => f.mobile === control.value) > -1 ? { duplicate: true } : null;
    }
      return this.contactList.findIndex((contact: Contact) => contact.mobile === control.value) > -1 ? { duplicate: true } : null;
    }
  }

  resetContactForm(){
    this.addContactForm.reset({});
    this.closeModal();
    this.contactService.contactFormChanged();
  }

  closeModal() {
    this.modalRef.hide();
  }
}
