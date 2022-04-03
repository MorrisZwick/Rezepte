import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.modul';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit {

  recipes!: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }
  onNewRecipe() {
    this.router.navigate(['/rezepte', 'neu']);

  }
}
