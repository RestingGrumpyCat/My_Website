from django.urls import path
from . import views
from .views import searchRecipeIngredient

urlpatterns = [
    path('searchRecipeIngredient/', searchRecipeIngredient.as_view()),

]