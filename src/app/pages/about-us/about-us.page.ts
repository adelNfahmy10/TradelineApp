import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AboutUsService } from 'src/core/services/about-us/about-us-service';
import { SafeHtmlPipe } from 'src/core/pipes/safe-html-pipe';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, SafeHtmlPipe]
})
export class AboutUsPage implements OnInit {
  private readonly _AboutUsService = inject(AboutUsService)

  aboutData:any[] = []

  ngOnInit() {
    this.getAboutUsData()
  }

  getAboutUsData():void{
    this._AboutUsService.getAboutUsInfo().subscribe({
      next:(res)=>{
        this.aboutData = res
        console.log(this.aboutData);
      }
    })
  }

}
