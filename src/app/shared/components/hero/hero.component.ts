import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class HeroComponent{

@Input() slides: any[] = [];

}