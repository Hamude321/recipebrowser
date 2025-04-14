export interface Recipe {
    id: string
    name: string;
    category: string;
    pictureUrl?: string;
}

export interface RecipeResponse {
    given: {
        category: string
    };
    recipes: Recipe[];
    categories: string[];
}

export interface Category {
    name: string;
}

