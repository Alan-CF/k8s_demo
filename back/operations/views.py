from rest_framework import viewsets

from operations.models import Ingredient, UnitMeasurement
from operations.serializers import IngredientSerializer, UnitMeasurementSerializer


class UnitMeasurementViewSet(viewsets.ModelViewSet):
    queryset = UnitMeasurement.objects.all()
    serializer_class = UnitMeasurementSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
