# from django.urls import reverse_lazy
# from rest_framework.test import APITestCase,APIClient
# from rest_framework import status


# class viewsTest(APITestCase):

#     def test_searchRecipeIngredient(self):
#         url = reverse_lazy('api:searchRecipeIngredient', args=['egg'])
#         client = APIClient()
#         response = client.get(url)
    
#         self.assertEqual(response.status_code, status.HTTP_200_OK, 'Unsuccessful api call on ' + url  )
