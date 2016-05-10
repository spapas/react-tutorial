from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets, filters
from rest_framework.decorators import detail_route, list_route
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from books.models import Book, Category, SubCategory, Author
from books.serializers import BookSerializer, CategorySerializer, SubCategorySerializer, AuthorSerializer

class HomeTemplateView(TemplateView, ):
    template_name = 'home.html'

class SmallPageNumberPagination(PageNumberPagination):
    page_size = 5

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('title', 'subcategory__category__name', 'subcategory__name', 'author__last_name',)
    pagination_class = SmallPageNumberPagination
    ordering_fields = ('subcategory__name', 'id', 'title', 'publish_date', 'author__last_name', )
    ordering = ('title',)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', )


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('last_name', 'first_name', )
    ordering_fields = ('id', 'last_name', )
    ordering = ('last_name',)
    
    @list_route()
    def get_author_number(self, request):
        return Response(Author.objects.all().count())
    
    

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name, category__name', )

    def get_queryset(self):
        queryset = SubCategory.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category_id=category)
        return queryset