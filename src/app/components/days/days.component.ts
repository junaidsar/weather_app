import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
})
export class DaysComponent implements OnInit {
  @Input() temperature;
  @Input() temperatureUnit;
  @Input() day;

  constructor() { }

  ngOnInit() {}

}
