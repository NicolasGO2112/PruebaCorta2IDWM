import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rickAndMorty-button',
  standalone: true,
  imports: [HttpClientModule],
  providers: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  @Input() page: number = 1;
  @Input() maxPage: number = 0;
  @Output() notifyParent = new EventEmitter<number>();
  @Input() buttonNextDisabled: boolean = false;
  @Input() buttonPreviousDisabled: boolean = false;

  nextPage() {
    this.page++;
    this.notifyParent.emit(this.page);
  }

  previousPage() {
    this.page--;
    this.notifyParent.emit(this.page);
  }
}
