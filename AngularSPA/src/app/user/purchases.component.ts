import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { PurchaseRequestModel } from '../shared/models/PurchaseRequestModel';
import { AccountService } from '../core/services/account.service';
import { ActiveUserModel } from '../shared/models/ActiveUserModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases!: PurchaseRequestModel[];
  currentUser!: ActiveUserModel;
  purchaseDetails!: PurchaseRequestModel;

  constructor(private userService:UserService, private accountService:AccountService, private modalService:NgbModal) { }

  openModal(content:any, modalTitle:string, movieId:number) {
    this.userService.getPurchaseDetails(movieId).subscribe(data => {
      if (data) {
        console.log(data);
        this.purchaseDetails = data;
      }
    })
    this.modalService.open(content, {ariaLabelledBy: modalTitle});
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    this.userService.getAllPurchases(Number(this.currentUser.nameid)).subscribe(data => {
      if (data) {
        this.purchases = data;
      }
    });
  }

}
