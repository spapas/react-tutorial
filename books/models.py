from django.db import models



class Book(models.Model):
    BOOK_CHOICES = (
        ('CRIME', 'Crime'), 
        ('HISTORY', 'History'), 
        ('HORROR', 'Horror'), 
        ('SCIFI', 'Sci-fi' )
    )
    
    
    title = models.CharField(max_length=50)
    category = models.CharField(choices=BOOK_CHOICES, max_length=16)