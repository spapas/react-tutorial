from rest_framework import serializers
from books.models import Book, Category, SubCategory

class BookSerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(source='subcategory.category.id', read_only=True)
    category_name = serializers.CharField(source='subcategory.name', read_only=True)
    
    class Meta:
        model = Book


class CategorySerializer(serializers.ModelSerializer):
    number_of_books = serializers.IntegerField(source='get_number_of_books', read_only=True)
    
    class Meta:
        model = Category


class SubCategorySerializer(serializers.ModelSerializer):
    number_of_books = serializers.IntegerField(source='get_number_of_books', read_only=True)
    
    class Meta:
        model = SubCategory