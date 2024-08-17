# Generated by Django 5.0.7 on 2024-08-17 09:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_table_api', '0002_alter_module_instructor_delete_instructor'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecture',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lectures', to='time_table_api.customuser'),
        ),
    ]