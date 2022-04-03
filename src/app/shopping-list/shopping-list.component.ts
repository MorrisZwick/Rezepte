import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.servcice';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {
  selectedIngredient!: Ingredient;
  ingredients: Ingredient[] = [];
  constructor(private sls: ShoppingListService) { }
  onSelectItem(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }
  onCleared() {
    this.selectedIngredient = null as any;
  }
  ngOnInit() {
    this.ingredients = this.sls.getIngredients();
  }

}
