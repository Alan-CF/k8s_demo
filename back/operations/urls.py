from rest_framework.routers import DefaultRouter

from operations import views

router = DefaultRouter()
router.register(
    r"unit-measurements", views.UnitMeasurementViewSet, basename="unit-measurement"
)
router.register(r"ingredients", views.IngredientViewSet, basename="ingredient")

urlpatterns = router.urls
