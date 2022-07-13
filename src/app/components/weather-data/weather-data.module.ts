import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { WeatherDataComponent } from './weather-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [WeatherDataComponent],
  exports: [
    WeatherDataComponent
  ]
})
export class WeatherDataModule {}
