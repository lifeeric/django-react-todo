# Generated by Django 3.1.5 on 2021-01-19 11:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='complete',
            new_name='completed',
        ),
    ]
