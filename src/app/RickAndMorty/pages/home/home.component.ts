import { Component, inject, output } from '@angular/core';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { CharactersComponent } from '../../components/characters/characters.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CharactersService } from '../../services/characters.service';
import { Result } from '../../interfaces/ResponseApi_GetCharacterInformation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonsComponent, CharactersComponent, SearchBarComponent],
  providers:[CharactersService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private characterService: CharactersService = inject(CharactersService);
  characters: Result[] = [];
  pageChange = output<number>();
  maxPage: number = 0;
  buttonNextDisabled: boolean = false;
  buttonPreviousDisabled: boolean = true;

  constructor() {
    this.getAllCharacters(1);
    this.getMaxPage();
  }

  setNewPage(page: number) {
    if (page === 1) {
      this.buttonPreviousDisabled = true;
    } else {
      this.buttonPreviousDisabled = false;
    }
    if (page === this.maxPage) {
      this.buttonNextDisabled = true;
    } else {
      this.buttonNextDisabled = false;
    }
    this.pageChange.emit(page);
    this.getAllCharacters(page);
  }
  getAllCharacters(page: number) {
    this.characterService.getAllCharacters(page).then((rickMorty) => {
      this.characters = rickMorty.results;
    }).catch((error) => {
      console.log(error);
    });
  }
  getCharactersByName(name: string) {
    this.characterService.getCharacterByName(name).then((rickMorty) => {
      this.characters = rickMorty.results;
    }).catch((error) => {
      console.log(error);
    });
  }
  getMaxPage() {
    this.characterService.getAllCharacters(1).then((rickMorty) => {
      this.maxPage = rickMorty.info.pages;
    }).catch((error) => {
      console.log(error);
    });
  }
}
