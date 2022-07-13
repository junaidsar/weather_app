import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss'],
})
export class WeatherDataComponent implements OnInit {
  @Input() percentageNumber;
  @Input() addedText;
  @Input() imagePath;
  constructor() { }

  ngOnInit() { }

}
