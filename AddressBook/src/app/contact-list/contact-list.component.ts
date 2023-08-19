import { Component, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ContactService } from '../service';
import { Contact } from '../model';
import { ContactFormComponent } from './contact-form'
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {

    contactList: Contact[] = [];
    filteredContactList: Contact[] = [];
    editContactModalRef!: BsModalRef;
    contactId!: number;
    addContactModalRef!: BsModalRef;
    constructor(private contactService: ContactService,
        private modalService: BsModalService,
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.getContactDetailList();
    }

    getContactDetailList() {
        this.contactService.getContactList().subscribe(result => {
            if(result){
                this.contactList = result;
            this.filteredContactList = result;
            }

            if (this.contactList.length > 0) {
                if (!this.route.firstChild) {
                    this.contactId = this.contactList[0].id;
                    this.navigateToContactDetail(this.contactId);
                } else {
                    // if(this.route.snapshot.paramMap.get('id') != null && this.contactList.find((contact: any) => this.route.snapshot.paramMap.get('id') == contact.id)){
                    //     this.contactId = +this.route.snapshot?.paramMap?.get('id');
                    //     this.navigateToContactDetail(this.contactId);
                    // }
                    if (this.contactList.findIndex((contact: any) => this.route.snapshot.paramMap.get('id') == contact.id) == -1) {
                        this.contactId = this.contactList[0].id;
                        this.navigateToContactDetail(this.contactId);
                    }
                }
            } else {
                this.router.navigate([],  { relativeTo: this.route });
            }
        });
    }

    addContactModal() {
        this.addContactModalRef = this.modalService.show(ContactFormComponent, { class: 'modal-lg', ignoreBackdropClick: true });
        this.addContactModalRef.content.onSave = (data: any) => {
            if (data) {
                this.contactService.contactListUpdated();
                this.getContactDetailList();
            }
        }
    }

    navigateToContactDetail(requestId: number) {
        this.router.navigate(['detail', requestId], { relativeTo: this.route });
    }

    filterContacts(value: any) {
        let filterValue = value.target.value
        if (filterValue.length > 0) {
            this.filteredContactList = this.contactList.filter((obj: any) => Object.keys(obj).some((key: any) => {
                return obj[key]?.toString().match(new RegExp(filterValue, 'i'));
            }));
        }
    }

    editContact(contact: Contact) {
        const initialState = {
            contactId: contact.id,
            contactDetail: contact,
        }
        this.editContactModalRef = this.modalService.show(ContactFormComponent, { class: 'modal-lg', ignoreBackdropClick: true, initialState });
        this.editContactModalRef.content.onSave = (data: any) => {
            if (data) {
                this.contactService.contactListUpdated();
                this.getContactDetailList();
            }
        }
    }

    deleteContact(contactId: number) {
        this.contactService.deleteContact(contactId).subscribe((data) => {
            if (data) {
                this.notificationService.success('Success', 'Contact successfully deleted');
                this.getContactDetailList();
            }
        }, (error) => {
            this.notificationService.error('Error', 'Failed to delete Contact');
        });
    }
}
