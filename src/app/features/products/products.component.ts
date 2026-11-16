import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { GeneralState, Product } from './product.interface';
import { ProductsStateService } from '../../core/services/products-state.service';

@Component({
  imports: [],
  selector: 'app-products',
  styleUrl: './products.component.css',
  templateUrl: './products.component.html',
})
export class ProductsComponent{

  private state = inject(ProductsStateService)

  products: Signal<GeneralState> = this.state.State;
  

    // ------------------------ Hooks ---------------------------
}
