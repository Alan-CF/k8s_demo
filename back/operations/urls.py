from rest_framework.routers import DefaultRouter

from operations import views

router = DefaultRouter()
router.register(
    r"unit-measurements", views.UnitMeasurementViewSet, basename="unit-measurement"
)
router.register(r"ingredients", views.IngredientViewSet, basename="ingredient")
router.register(
    r"recipe-ingredients", views.RecipeIngredientViewSet, basename="recipe-ingredient"
)
router.register(r"recipes", views.RecipeViewSet, basename="recipe")

urlpatterns = router.urls
