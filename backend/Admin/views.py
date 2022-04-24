from django.shortcuts import render
from . import models
from . import serializers

from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import permissions



from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView




class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter



@api_view(['GET'])
def image_list(request):
    if request.method == 'GET':
        images = models.Image.objects.all()
        serializer = serializers.ImageSerializer(images, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def image_detail(request, pk):
    if request.method == 'GET':
        image = models.Image.objects.get(pk=pk)
        serializer = serializers.ImageSerializer(image)
        return Response(serializer.data)

@api_view(['POST'])
def image_create(request):
    if request.method == 'POST':
        serializer = serializers.ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'] )
def image_update(request, pk):
    if request.method == 'PUT':
        image = models.Image.objects.get(pk=pk)
        serializer = serializers.ImageSerializer(instance=image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def image_delete(request, pk):
    if request.method == 'DELETE':
        image = models.Image.objects.get(pk=pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


