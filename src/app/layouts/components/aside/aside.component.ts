import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsStateService } from '../../../core/services/products-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface SortOption {
  sortBy: string;
  order: 'asc' | 'desc';
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-aside',
  styleUrl: './aside.component.css',
  templateUrl: './aside.component.html',
})
export class AsideComponent implements OnInit{


  constructor() {
    this.filterForm.valueChanges.pipe(
      takeUntilDestroyed(),
    )
    .subscribe((v)=>{
      this.productState.setCategory(v.category ?? "");
      // if(v.category && v.sort?.order){
      //   this.filterForm.value.category = "";
      // }
      this.productState.setOrderBy(v.sort?.order ?? "");
      this.productState.setSortBy(v.sort?.sortBy ?? "");
      console.log(v.sort?.order , v.sort?.sortBy)
    })
  }

  private categoryService = inject(CategoryService)
  private productState = inject(ProductsStateService)
  private fb = inject(FormBuilder)

    filterForm = this.fb.group({
      category : [""],
      sort: this.fb.control<SortOption | null>(null)
    })
  categories:WritableSignal<any> = signal<[]>([]);

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categories.set(res);
    })
  }

  // ------------hooks---------------------
  ngOnInit(): void {
    this.getAllCategories();
    
  }
}
