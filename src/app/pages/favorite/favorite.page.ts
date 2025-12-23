import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItemSliding, IonList, IonItem, IonAvatar, IonLabel, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { FavoriteService } from 'src/core/services/favorite/favorite-service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItemOption, IonItemOptions, IonLabel, IonAvatar, IonItem, IonList, IonItemSliding, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class FavoritePage implements OnInit {
  private readonly _FavoriteService = inject(FavoriteService)

  allFavorites:any[] = []

  ngOnInit() {
    this.getAllFavorites()
  }

  getAllFavorites():void{
    this._FavoriteService.getFavorites().subscribe({
      next:(res)=>{
        this.allFavorites = res
        console.log(this.allFavorites);
      }
    })
  }

  deleteFavorite(id:any):void{
    this._FavoriteService.deleteFavorites(id).subscribe({
      next:(res)=>{
        console.log('Product Removed from favorites');
        this.getAllFavorites()
      }
    })
  }



}
