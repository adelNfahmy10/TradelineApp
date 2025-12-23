import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CategoriesService } from 'src/core/services/categories/categories-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonItem, IonList, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class CategoriesPage implements OnInit{
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  categories:any;
  catName:string = '';

  ngOnInit(): void {
    this.getAllSubCategories()
  }

  getAllSubCategories():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(param) => {
        let catName = param.get('name')
        this._CategoriesService.getCategoryByName(catName).subscribe({
          next:(res)=>{
            this.categories = res
          }
        })
      }
    })
  }
}
