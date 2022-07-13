import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WeatherDataModule } from '../../components/weather-data/weather-data.module';
import { DaysModule } from '../../components/days/days.module';
import { TemperatureComponentModule } from '../../components/temperature-component/temperature-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    WeatherDataModule,
    DaysModule,
    TemperatureComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
