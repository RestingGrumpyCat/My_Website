from django.urls import path
from . import views
from .views import searchRecipeIngredient,searchRecipeByID

urlpatterns = [
    path('searchRecipeIngredient/', searchRecipeIngredient.as_view()),
    path('searchRecipeByID/', searchRecipeByID.as_view()),

]