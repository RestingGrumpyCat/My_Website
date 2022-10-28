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