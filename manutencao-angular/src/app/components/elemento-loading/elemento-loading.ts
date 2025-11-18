import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elemento-loading',
  imports: [],
  templateUrl: './elemento-loading.html',
  styleUrl: './elemento-loading.css'
})
export class ElementoLoading {
  @Input() cor: string = '#B6CEB4';
}