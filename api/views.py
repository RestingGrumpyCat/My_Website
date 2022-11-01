import re
import requests
from .serializers import searchRecipeIngredientSerializer, searchRecipeByIDSerializer
from .models import Recipe, Recipe_id
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.http import JsonResponse

import environ

from api import serializers
env = environ.Env()
environ.Env.read_env()
apiKey = env('API_KEY')

def populate_api_recipe(data, ingredient):
    for item in data:
        recipe_data = Recipe(
            id = item["id"],
            ingredient = ingredient,
            image = item["image"],
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

def populate_api_recipe_id(data):

    recipe_data = Recipe_id(
        id = data[0]["id"],
        title = data[0]['title'],
        summary = data[0]['summary'],
        image = data[0]['image'],
        imageType = data[0]['imageType'],
        servings = data[0]['servings'],
        readyInMinutes = data[0]['readyInMinutes'],
        sourceName = data[0]['sourceName'],
        sourceUrl = data[0]['sourceUrl'],
        spoonacularSourceUrl = data[0]['spoonacularSourceUrl'],
        aggregateLikes = data[0]['aggregateLikes'],
        healthScore = data[0]['healthScore'],
        pricePerServing = data[0]['pricePerServing'],
        extendedIngredients = data[0]['extendedIngredients'],
        glutenFree = data[0]['glutenFree'],
        vegetarian = data[0]['vegetarian'],
        vegan = data[0]['vegetarian'],
        dairyFree = data[0]['dairyFree']
        )
    recipe_data.save()


class searchRecipeIngredient(APIView):
    lookup_url_kwarg = 'ingredients'
    serializer_class = searchRecipeIngredientSerializer

    def get(self, request, format=None):
        ingredient = request.query_params.get(self.lookup_url_kwarg)
        querySet = Recipe.objects.all().filter(ingredient=ingredient)

        if querySet.exists():
            querySet_json = searchRecipeIngredientSerializer(querySet, many=True)
            return JsonResponse(querySet_json.data, safe=False)
        else: 
            url = 'https://api.spoonacular.com/recipes/findByIngredients'
            apiString = url+'?apiKey='+apiKey + '&ingredients=' + ingredient
            response = requests.get(apiString)
            data = response.json()
            if len(data) == 0:
                return Response({'Invalid ingredient'}, status=status.HTTP_400_BAD_REQUEST)

            return JsonResponse(data, safe=False)
        
    def post(self, request, format=None):
        if len(request.data) > 0:
            data = request.data
            ingredient=data[-1]['ingredient']
            data = data[:-1]
            querySet = Recipe.objects.all().filter(ingredient=ingredient)
            if not querySet.exists():
                if ',' not in ingredient:
                    print('Populating db now!')
                    populate_api_recipe(data, ingredient)
            return Response({'OK'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad request': 'No data is passed.'}, status=status.HTTP_400_BAD_REQUEST)


class searchRecipeByID(APIView):
    lookup_url_kwarg = 'id'
    serializers_class = searchRecipeByIDSerializer
    def get(self, request, format=None):
        ID = request.query_params.get(self.lookup_url_kwarg)
        querySet = Recipe_id.objects.all().filter(id=ID)
        if querySet.exists():
            querySet_json = searchRecipeByIDSerializer(querySet, many=True)
            return JsonResponse(querySet_json.data, safe=False)
        else:
            url = 'https://api.spoonacular.com/recipes/'
            apiString = url + ID + '/information?includeNutrition=false' + '&apiKey='+apiKey 
            response = requests.get(apiString)
            data = response.json()
            summary = data['summary']
            summary = re.sub(r'\<.*?\>', '', summary)
            data['summary'] = summary
            if len(data) == 0:
                return Response({'Invalid id'}, status=status.HTTP_400_BAD_REQUEST)
        
            return JsonResponse(data, safe=False)
    
    def post(self, request, format=None):
        data = request.data

        if len(data) > 0:
            ID = data[0]['id']
            querySet = Recipe_id.objects.all().filter(id=ID)
            if not querySet.exists():
                if len(data[0]) != 2:
                    print('Populating data now!')
                    populate_api_recipe_id(data)    
                    return Response({'Data populated successfully!'}, status=status.HTTP_200_OK)
                return Response({'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                aggregateLikes = data[0]['aggregateLikes']
                recipe = querySet[0]
                recipe.aggregateLikes = aggregateLikes
                recipe.save(update_fields=['aggregateLikes'])
                return Response({'Likes updated successfully'}, status=status.HTTP_200_OK)
            
                
        else:
            return Response({'Bad request': 'No data is passed.'}, status=status.HTTP_400_BAD_REQUEST)

        

 

        
