from rest_framework import serializers

from .models import Ingredient, Recipe, RecipeIngredient, UnitMeasurement


class UnitMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitMeasurement
        fields = ["id", "name", "abbreviation", "dimension"]
        read_only_fields = ["id"]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "description"]
        read_only_fields = ["id"]


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.PrimaryKeyRelatedField(
        queryset=Ingredient.objects.all(),
        write_only=True,
    )
    unit = serializers.PrimaryKeyRelatedField(
        queryset=UnitMeasurement.objects.all(),
        write_only=True,
    )

    ingredient_details = IngredientSerializer(source="ingredient", read_only=True)
    unit_details = UnitMeasurementSerializer(source="unit", read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = [
            "id",
            "recipe",
            "ingredient",
            "ingredient_details",
            "quantity",
            "unit",
            "unit_details",
        ]
        read_only_fields = ["id"]


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(
        source="recipeingredient_set", many=True
    )

    class Meta:
        model = Recipe
        fields = ["id", "name", "description", "recipe_ingredients"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        ingredients_data = validated_data.pop("recipeingredient_set", [])
        recipe = Recipe.objects.create(**validated_data)
        self._write_ingredients(recipe, ingredients_data)
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop("recipeingredient_set", [])
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.save()

        if ingredients_data:
            instance.recipeingredient_set.all().delete()
            self._write_ingredients(instance, ingredients_data)

        return instance

    def _write_ingredients(self, recipe, ingredients_data):
        RecipeIngredient.objects.bulk_create(
            RecipeIngredient(recipe=recipe, **ingredient_data)
            for ingredient_data in ingredients_data
        )
