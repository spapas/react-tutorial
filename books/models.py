from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def get_number_of_books(self):
        return Book.objects.filter(subcategory__category=self).count()
    
    def __unicode__(self):
        return self.name
    
class SubCategory(models.Model):
    category = models.ForeignKey('Category')
    name = models.CharField(max_length=50)
    
    def get_number_of_books(self):
        return Book.objects.filter(subcategory=self).count()
    
    def __unicode__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=50)
    publish_date = models.DateField(blank=True, null=True)
    subcategory = models.ForeignKey('SubCategory', blank=True, null=True)
    
    def __unicode__(self):
        return self.title