import { Component } from '@angular/core';
import { RecipeService } from './recipe/recipe.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  constructor(private recipeService: RecipeService) { }


  onStore() {
    this.recipeService.storeData()
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }
  onFetch() {
    this.recipeService.fetchData()

  }

}
