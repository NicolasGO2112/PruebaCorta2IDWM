import { Component, Input } from '@angular/core';
import { Result } from '../../interfaces/ResponseApi_GetCharacterInformation';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
  @Input() characters: Result[] = [];
}