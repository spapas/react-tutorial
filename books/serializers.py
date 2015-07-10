from rest_framework import serializers
from books.models import Book, Category, SubCategory

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory