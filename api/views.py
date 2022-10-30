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
apiKey = env('API_KEY')

def populateDB(data, ingredient):
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



class searchRecipeIngredient(APIView):
    lookup_url_kwarg = 'ingredients'
    serializer_class = searchRecipeSerializer

    def get(self, request, format=None):
        ingredient = request.query_params.get(self.lookup_url_kwarg)
        querySet = Recipe.objects.all().filter(ingredient=ingredient)

        if querySet.exists():
            querySet_json = searchRecipeSerializer(querySet, many=True)
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
                    populateDB(data, ingredient)
            return Response({'OK'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad request': 'No data is passed.'}, status=status.HTTP_400_BAD_REQUEST)


# class searchOneRecipeByID(APIView):
#     lookup_url_kwarg = id

#     def get(self, request, format=None):
