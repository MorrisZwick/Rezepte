import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.servcice';
import { Recipe } from '../recipe.modul';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe!: Recipe;
  recipeId!: number;

  private subscription!: Subscription;
  constructor(private recipeService: RecipeService,
    private sls: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.subscription =
      this.activatedRoute.params.subscribe(
        params => {
          this.recipeId = +params['id'];
          this.selectedRecipe = this.recipeService.getRecipe(this.recipeId);
        }
      );
  }
  onAddToList() {
    this.sls.addIngredients(this.selectedRecipe.ingredient);

  }
  onEdit() {
    this.router.navigate(['/rezepte', this.recipeId, 'bearbeiten']);
  }
  onDelete() {
    this.router.navigate(['/rezepte']);
    this.recipeService.deleteRecipe(this.recipeId);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}
