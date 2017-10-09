import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {

  closeResult: string;

  constructor(private ngbModal: NgbModal) { }

  ngbModalRef: NgbModalRef;

  open(modal) {
    this.ngbModalRef = this.ngbModal.open(modal)
    return this.ngbModalRef
  }

  close() {
    this.ngbModalRef.close();
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
