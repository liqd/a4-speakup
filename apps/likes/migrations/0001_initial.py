# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-03-27 13:53
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    replaces = [('a4-speakup_likes', '0001_initial')]

    dependencies = [
        ('a4_candy_questions', '0002_question_category'),
        ('sessions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='a4_candy_questions.Question')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sessions.Session')),
            ],
            options={
                'db_table': 'a4-speakup_likes_like',
            },
        ),
    ]
