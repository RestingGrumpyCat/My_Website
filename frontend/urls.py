from .views import index
from django.urls import path,include

app_name='frontend'
urlpatterns = [
    path('', index),
    path('recipes/<str:ingredient>', index),
    path('recipe/<int:recipeID>', index), 

]
