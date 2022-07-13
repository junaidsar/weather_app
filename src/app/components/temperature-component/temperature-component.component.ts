import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-component',
  templateUrl: './temperature-component.component.html',
  styleUrls: ['./temperature-component.component.scss'],
})
export class TemperatureComponentComponent implements OnInit {
  @Input() gettingDateC;
  @Input() temperatureC;
  @Input() weatherImageC;
  @Input() cityNameC;
  @Input() countryNameC;
  @Input() todaySignC;
  constructor() { }

  ngOnInit() {}

}
