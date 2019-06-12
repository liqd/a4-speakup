# Generated by Django 2.2.2 on 2019-06-06 11:45

from django.db import migrations

sql = """UPDATE django_content_type
         SET app_label = 'a4_candy_likes'
         WHERE app_label = 'a4-speakup_likes';"""

reverse_sql = """UPDATE django_content_type
                 SET app_label = 'a4-speakup_likes';
                 WHERE app_label = 'a4_candy_likes';"""

class Migration(migrations.Migration):

    dependencies = [
        ('a4_candy_likes', '0004_safe_session_as_text'),
    ]

    operations = [
    ]
