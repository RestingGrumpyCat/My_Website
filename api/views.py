import requests
from .serializers import searchRecipeSerializer
from .models import Recipe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.http import JsonResponse

import environ

from api import serializers
env = environ.Env()
environ.Env.read_env()

def populateDB(data, ingredient):
    for item in data:
        recipe_data = Recipe(
            id = item["id"],
            ingredient = ingredient,
            image_url = item["image"],
            imageType= item["imageType"],
            likes = item["likes"],
            missedIngredientCount = item["missedIngredientCount"],
            title = item['title'],
            usedIngredientCount = item['usedIngredientCount'],
            missedIngredients = item['missedIngredients'],
            unusedIngredients = item['unusedIngredients'],
            usedIngredients = item['usedIngredients']
        )
        recipe_data.save()




class searchRecipe(APIView):
    lookup_url_kwarg = 'ingredients'
    serializer_class = searchRecipeSerializer

    def get(self, request, format=None):
        ingredient = request.query_params.get(self.lookup_url_kwarg)
        querySet = Recipe.objects.all().filter(ingredient=ingredient)
        querySet_json = searchRecipeSerializer(querySet, many=True)
        return JsonResponse(querySet_json.data, safe=False)



# class searchRecipe(APIView): 
#     lookup_url_kwarg = 'ingredients'

#     def get(self, request, format=None):
#         apiKey = env('API_KEY')
#         url = 'https://api.spoonacular.com/recipes/findByIngredients'
#         ingredient = request.query_params.get(self.lookup_url_kwarg)
#         print(ingredient)
#         if ingredient!=None:
#             apiString = url+'?apiKey='+apiKey + '&ingredients=' + ingredient
#             response = requests.get(apiString)
#             data = response.json()
#             populateDB(data, ingredient)
#             return Response({ingredient}, status=status.HTTP_200_OK)
            
#         else: 
#             return Response({"No ingredient is passed"}, status=status.HTTP_400_BAD_REQUEST)
        

