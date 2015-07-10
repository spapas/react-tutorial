from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name
    
class SubCategory(models.Model):
    category = models.ForeignKey('Category')
    name = models.CharField(max_length=50)
    
    def __unicode__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=50)
    subcategory = models.ForeignKey('SubCategory', blank=True, null=True)
    
    def __unicode__(self):
        return self.title