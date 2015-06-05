# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=16, choices=[(b'CRIME', b'Crime'), (b'HISTORY', b'History'), (b'HORROR', b'Horror'), (b'SCIFI', b'Sci-fi')])),
            ],
        ),
    ]
