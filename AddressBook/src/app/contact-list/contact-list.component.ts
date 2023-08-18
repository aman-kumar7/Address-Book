import { Component, OnInit } from '@angular/core';

import { BsModalService} from 'ngx-bootstrap/modal';

import { ContactService } from '../service';
import { Contact } from '../model';
import { ContactFormComponent} from './contact-form'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {

    contactList: Contact[] = [];
    filteredContactList: Contact[] = [];
    editContactModalRef: any;
    contactId!: number;
    constructor(private contactService: ContactService, 
        private modalService: BsModalService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.getContactDetailList();
    }

    getContactDetailList() {
        this.contactService.getContactList().subscribe(result => {
            this.contactList = result;
            this.filteredContactList = result;

            if (!this.route.firstChild) {
                this.contactId = this.contactList[0].id;
                this.navigateToContactDetail(this.contactId);
            }
        });
    }

    addContactModal(){
        this.modalService.show(ContactFormComponent, { class: 'modal-lg', ignoreBackdropClick: true })
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

    editContact(contact: Contact){
        const initialState = {
            contactId: contact.id,
            contactDetail: contact,
        }
        this.editContactModalRef = this.modalService.show(ContactFormComponent, { class: 'modal-lg', ignoreBackdropClick: true, initialState });
        this.editContactModalRef.content.onSave = (data: any) => {
            if (data) {
                this.getContactDetailList();
            }
        }
    }

    deleteContact(contactId: number){
        this.contactService.deleteContact(contactId).subscribe(() => {
            this.getContactDetailList();  
        });
    }
}
