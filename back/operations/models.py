from django.db import models


class UnitDimension(models.TextChoices):
    MASS = "mass", "Mass"
    VOLUME = "volume", "Volume"
    LENGTH = "length", "Length"


class UnitMeasurement(models.Model):
    name = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)
    dimension = models.CharField(
        max_length=10, choices=UnitDimension.choices, default=UnitDimension.MASS
    )


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    ingredients = models.ManyToManyField(
        Ingredient, through="RecipeIngredient", related_name="recipies"
    )


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()
    unit = models.ForeignKey(UnitMeasurement, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["recipe", "ingredient"],
                name="unique_recipe_ingredient",
            ),
            models.CheckConstraint(
                condition=models.Q(quantity__gt=0),
                name="quantity_gt_0",
            ),
        ]
