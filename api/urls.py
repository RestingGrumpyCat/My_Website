from django.urls import path
from . import views
from .views import searchRecipeIngredient,searchRecipeByID

app_name = 'api'
urlpatterns = [
    path(r'searchRecipeIngredient/', searchRecipeIngredient.as_view(), name='searchRecipeIngredient'),
    path(r'searchRecipeByID/', searchRecipeByID.as_view(), name='searchRecipeByID'),

]