# Generated by Django 5.0.7 on 2024-08-17 10:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_table_api', '0003_lecture_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='instructor',
            field=models.ForeignKey(limit_choices_to={'role': 'instructor'}, on_delete=django.db.models.deletion.CASCADE, related_name='instructor', to='time_table_api.customuser'),
        ),
    ]