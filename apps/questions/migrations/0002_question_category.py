# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-21 13:44
from __future__ import unicode_literals

import adhocracy4.categories.fields
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('a4categories', '0002_category_icon'),
        ('a4-speakup_questions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='category',
            field=adhocracy4.categories.fields.CategoryField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='a4categories.Category', verbose_name='Category'),
        ),
    ]
