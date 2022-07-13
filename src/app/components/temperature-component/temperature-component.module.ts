import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TemperatureComponentComponent } from './temperature-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [TemperatureComponentComponent],
  exports: [
    TemperatureComponentComponent
  ]
})
export class TemperatureComponentModule {}
