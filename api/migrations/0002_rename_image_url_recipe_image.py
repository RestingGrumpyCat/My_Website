# Generated by Django 4.1.2 on 2022-10-28 00:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='image_url',
            new_name='image',
        ),
    ]
