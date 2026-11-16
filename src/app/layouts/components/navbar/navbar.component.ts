import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../../core/services/products-state.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '../../../../../node_modules/@angular/common/types/_common_module-chunk';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private stateService= inject(ProductsStateService);
  private fb = inject(FormBuilder);

  constructor(){
    this.searchForm.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe((q)=> {
      this.stateService.setSearch(q.search ?? '')
    })
  }

  searchForm = this.fb.group(
    {
      search : [""]
    }
  )

  
}
