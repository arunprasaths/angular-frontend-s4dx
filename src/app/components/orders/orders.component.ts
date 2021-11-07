import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private dataService:DataService) { }

  orders$:Observable<Array<Order>> = this.dataService.allOrders$;

  ngOnInit(): void {
  }

}
