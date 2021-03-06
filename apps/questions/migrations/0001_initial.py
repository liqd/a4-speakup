# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-21 13:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    replaces = [('a4-speakup_questions', '0001_initial')]

    dependencies = [
        ('a4modules', '0004_description_maxlength_512'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('modified', models.DateTimeField(blank=True, editable=False, null=True)),
                ('text', models.TextField(max_length=1000)),
                ('is_answered', models.BooleanField(default=False)),
                ('is_favourite', models.BooleanField(default=False)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='a4modules.Module')),
            ],
            options={
                'abstract': False,
                'db_table': 'a4-speakup_questions_question',
            },
        ),
    ]
