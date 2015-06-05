from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets, filters
from books.models import Book
from books.serializers import BookSerializer

class HomeTemplateView(TemplateView, ):
    template_name = 'home.html'


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'category')