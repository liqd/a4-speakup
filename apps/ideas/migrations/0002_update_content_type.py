# Generated by Django 2.2.2 on 2019-06-06 11:39

from django.db import migrations

sql = """UPDATE django_content_type
         SET app_label = 'a4_candy_ideas'
         WHERE app_label = 'a4-speakup_ideas';"""

reverse_sql = """UPDATE django_content_type
                 SET app_label = 'a4-speakup_ideas';
                 WHERE app_label = 'a4_candy_ideas';"""


class Migration(migrations.Migration):

    dependencies = [
        ('a4_candy_ideas', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(sql, reverse_sql)
    ]
