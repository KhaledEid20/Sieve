import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { AsideComponent } from './layouts/components/aside/aside.component';
import { FlowbiteService } from './core/services/flowbite.service';
import { ProductsComponent } from './features/products/products.component';

@Component({
  imports: [RouterOutlet, NavbarComponent, AsideComponent, ProductsComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  private flowbiteService = inject(FlowbiteService);

  ngOnInit() {
    this.flowbiteService.loadFlowbite().catch((error: unknown) => {
      console.error('Failed to initialize Flowbite:', error);
    });
  }
}
