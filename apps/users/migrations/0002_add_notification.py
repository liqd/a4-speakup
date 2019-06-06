# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-14 08:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('a4-speakup_users', '0002_add_notification')]

    dependencies = [
        ('a4_candy_users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AddField(
            model_name='user',
            name='get_notifications',
            field=models.BooleanField(default=True, help_text='Designates whether you want to receive notifications about content you follow. Unselect if you do not want to receive notifications.', verbose_name='Send me email notifications'),
        ),
    ]
