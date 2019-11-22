import { Component, ViewChild } from '@angular/core';
import { ApiService } from "src/app/services/api.service";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll,null) infiniteScroll: IonInfiniteScroll;  
  public productsData:any=[];
  public pageNumber: number = 0;
  public listSize: number = 0
  constructor( public apiService: ApiService) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService.getList(0).subscribe(response => {
      this.productsData = response['list'];
      console.log("listt::: "+this.productsData)
    })
  }


  doInfinite(event) {
    if (this.listSize!= this.productsData.length) {
      this.pageNumber++;
      this.apiService.getList(this.pageNumber).subscribe(
        data => {
          console.log("after push"+data['list'])
          for (var i = 0; i < data['list'].length; i++) {
            this.productsData.push(data['list'][i]);
          }
          event.target.complete();;        }
        , error => {
          console.log(error.json());
          event.target.complete();;        });

    } else {
      event.target.complete();
    }
  }
}
