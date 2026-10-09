from rest_framework import serializers

from .models import Ingredient, UnitMeasurement


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
