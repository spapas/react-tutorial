from django.core.management.base import BaseCommand, CommandError
from books.models import Author
import random, string

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'


    def handle(self, *args, **options):
        author = Author.objects.create(
            first_name=random.choice(string.ascii_uppercase) + ''.join(random.choice(string.ascii_lowercase) for _ in range(7)),
            last_name=random.choice(string.ascii_uppercase) + ''.join(random.choice(string.ascii_lowercase) for _ in range(7)),
        )
        print "Author {} {} added ".format(author.first_name, author.last_name)