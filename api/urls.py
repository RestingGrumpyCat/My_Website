from django.urls import path
from . import views
from .views import searchRecipe

urlpatterns = [
    path('searchRecipe/', searchRecipe.as_view()),

]