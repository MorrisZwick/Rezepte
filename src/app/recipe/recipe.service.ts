import { Recipe } from "./recipe.modul";
import { Ingredient } from "../shared/ingredient.model";
import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";



@Injectable()
export class RecipeService {
    recipesChanged = new EventEmitter<Recipe[]>();

    constructor(private http: HttpClient) { }

    private recipes: Recipe[] = [
        new Recipe('Schnitzel',
            'Sehr lecker',
            'https://www.gutekueche.at/storage/media/recipe/106126/conv/wiener-schnitzel-default.jpg',
            [
                new Ingredient('Pommes', 10),
                new Ingredient('Schnitzel', 1)
            ]),
        new Recipe('Salat',
            'Lecker',
            'https://www.gutekueche.at/storage/media/recipe/14520/conv/gemischter-salat_1497598343-default.jpg',
            [

            ]),
    ];

    getRecipes() {
        return this.recipes;
    }
    getRecipe(id: number) {
        return this.recipes[id];
    }
    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }
    editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
        this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
    }
    storeData() {
        const body = JSON.stringify(this.recipes);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put('https://ng-http-5b4f3-default-rtdb.europe-west1.firebasedatabase.app/recipe.json', body);
    }
    fetchData() {
        this.http.get<Recipe[]>('https://ng-http-5b4f3-default-rtdb.europe-west1.firebasedatabase.app/recipe.json')
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                    this.recipesChanged.emit(this.recipes)
                }
            );



    }

}