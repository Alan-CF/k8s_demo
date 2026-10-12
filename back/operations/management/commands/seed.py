from django.core.management.base import BaseCommand

from operations.models import Ingredient, Recipe, RecipeIngredient, UnitMeasurement


class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding the database...")
        self.seed_ingredients()
        self.seed_recipes()
        self.stdout.write(self.style.SUCCESS("Database seeding completed."))

    def seed_ingredients(self):
        ingredients = [
            {"name": "Bread", "description": "Sliced white or wheat bread"},
            {"name": "Peanut Butter", "description": "Creamy peanut butter"},
            {"name": "Jelly", "description": "Grape jelly"},
            {"name": "Butter", "description": "Salted butter"},
            {"name": "Cheddar Cheese", "description": "Sharp cheddar cheese, sliced"},
            {"name": "Chocolate Milk", "description": "Chocolate flavored milk"},
        ]
        for ingredient in ingredients:
            Ingredient.objects.get_or_create(**ingredient)

    def seed_recipes(self):
        bread = Ingredient.objects.get(name="Bread")
        peanut_butter = Ingredient.objects.get(name="Peanut Butter")
        jelly = Ingredient.objects.get(name="Jelly")
        butter = Ingredient.objects.get(name="Butter")
        cheddar = Ingredient.objects.get(name="Cheddar Cheese")
        chocolate_milk_ing = Ingredient.objects.get(name="Chocolate Milk")

        cup = UnitMeasurement.objects.get(abbreviation="cup")
        tbsp = UnitMeasurement.objects.get(abbreviation="tbsp")

        pbj, _ = Recipe.objects.get_or_create(
            name="PB&J Sandwich",
            defaults={"description": "A classic peanut butter and jelly sandwich"},
        )
        RecipeIngredient.objects.get_or_create(
            recipe=pbj, ingredient=bread, defaults={"quantity": 2, "unit": None}
        )
        RecipeIngredient.objects.get_or_create(
            recipe=pbj, ingredient=peanut_butter, defaults={"quantity": 2, "unit": tbsp}
        )
        RecipeIngredient.objects.get_or_create(
            recipe=pbj, ingredient=jelly, defaults={"quantity": 1, "unit": tbsp}
        )

        grilled_cheese, _ = Recipe.objects.get_or_create(
            name="Grilled Cheese",
            defaults={"description": "A buttery, crispy grilled cheese sandwich"},
        )
        RecipeIngredient.objects.get_or_create(
            recipe=grilled_cheese,
            ingredient=bread,
            defaults={"quantity": 2, "unit": None},
        )
        RecipeIngredient.objects.get_or_create(
            recipe=grilled_cheese,
            ingredient=butter,
            defaults={"quantity": 1, "unit": tbsp},
        )
        RecipeIngredient.objects.get_or_create(
            recipe=grilled_cheese,
            ingredient=cheddar,
            defaults={"quantity": 2, "unit": None},
        )

        chocolate_milk, _ = Recipe.objects.get_or_create(
            name="Chocolate Milk",
            defaults={"description": "A tall glass of chocolate milk"},
        )
        RecipeIngredient.objects.get_or_create(
            recipe=chocolate_milk,
            ingredient=chocolate_milk_ing,
            defaults={"quantity": 1, "unit": cup},
        )
