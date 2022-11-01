from .views import index
from django.urls import path,include

urlpatterns = [
    path('', index),
    path('recipes/<str:ingredient>', index),
    path('recipe/<int:recipeID>', index), 

]
