# Generated by Django 5.0.7 on 2024-08-17 13:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_table_api', '0004_alter_module_instructor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='time_table_api.classroom'),
        ),
    ]
