from django.contrib import admin
from books.models import Book, Category, SubCategory

admin.site.register(Book)
admin.site.register(Category)
admin.site.register(SubCategory)