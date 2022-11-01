from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.

class Recipe(models.Model):
    id = models.IntegerField(primary_key=True, blank=False, null=False)
    ingredient = models.CharField(max_length=20, blank=False, null=False)
    image = models.CharField(max_length=100, blank=True, null=True)
    imageType = models.CharField(max_length=20, blank=True, null=True)
    likes = models.IntegerField(blank=True, null=True)
    missedIngredientCount = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    usedIngredientCount = models.IntegerField(blank=True, null=True)
    missedIngredients = ArrayField(models.CharField(max_length=200, blank=True, null=True))
    unusedIngredients = ArrayField(models.CharField(max_length=200, blank=True, null=True))
    usedIngredients = ArrayField(models.CharField(max_length=200, blank=True, null=True))

class Recipe_id(models.Model):
    id = models.IntegerField(primary_key=True, blank=False, null=False)
    title = models.CharField(max_length=100, blank=True, null=True)
    summary = models.CharField(max_length=10000, blank=True, null=True)
    image = models.CharField(max_length=100, blank=True, null=True)
    imageType = models.CharField(max_length=20, blank=True, null=True)
    servings = models.IntegerField(blank=True, null=True)
    readyInMinutes = models.IntegerField(blank=True, null=True)
    sourceName = models.CharField(max_length=100, blank=True, null=True)
    sourceUrl = models.CharField(max_length=100, blank=True, null=True)
    spoonacularSourceUrl = models.CharField(max_length=100, blank=True, null=True)
    aggregateLikes = models.IntegerField(blank=True, null=True)
    healthScore = models.IntegerField(blank=True, null=True)
    pricePerServing = models.IntegerField(blank=True, null=True)
    extendedIngredients = ArrayField(models.CharField(max_length=200, blank=True, null=True))
     
