# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('category', models.ForeignKey(to='books.Category')),
            ],
        ),
        migrations.RemoveField(
            model_name='book',
            name='category',
        ),
        migrations.AddField(
            model_name='book',
            name='subcategory',
            field=models.ForeignKey(blank=True, to='books.SubCategory', null=True),
        ),
    ]
