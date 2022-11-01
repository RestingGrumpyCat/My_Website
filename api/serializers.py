from rest_framework import serializers
from .models import Recipe, Recipe_id

class searchRecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class searchRecipeByIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe_id
        fields = '__all__'