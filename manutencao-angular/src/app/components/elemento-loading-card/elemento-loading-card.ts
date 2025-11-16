import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elemento-loading-card',
  imports: [],
  templateUrl: './elemento-loading-card.html',
  styleUrl: './elemento-loading-card.css'
})
export class ElementoLoadingCard {
  @Input() cor: string = '#B6CEB4';
}
