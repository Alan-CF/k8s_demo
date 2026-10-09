from rest_framework import viewsets

from operations.models import Ingredient, Recipe, RecipeIngredient, UnitMeasurement
from operations.serializers import (
    IngredientSerializer,
    RecipeIngredientSerializer,
    RecipeSerializer,
    UnitMeasurementSerializer,
)


class UnitMeasurementViewSet(viewsets.ModelViewSet):
    queryset = UnitMeasurement.objects.all()
    serializer_class = UnitMeasurementSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeIngredientViewSet(viewsets.ModelViewSet):
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
