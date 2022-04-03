import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.servcice';


@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: [
  ]
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
  @Input() selectedIngredient!: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private sls: ShoppingListService) { }
  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.isAdd) {
      this.sls.editIngredient(this.selectedIngredient, newIngredient);

    } else {
      this.sls.addIngredient(newIngredient);
    }

    this.onClear(form);
  }
  onClear(form: NgForm) {
    this.cleared.emit();
    form.resetForm();

  }
  onDelete(form: NgForm) {
    this.sls.deleteIngredient(this.selectedIngredient);
    this.onClear(form);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedIngredient'].currentValue == null) {
      this.selectedIngredient = { name: "", amount: 0 };
      this.isAdd = true;
    } else {
      this.isAdd = false;

    }
  }

  ngOnInit(): void {
  }

}
