# Generated by Django 5.0.7 on 2024-08-11 14:00

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_table_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='module',
            old_name='title',
            new_name='module_name',
        ),
        migrations.RemoveField(
            model_name='module',
            name='credits',
        ),
        migrations.AddField(
            model_name='module',
            name='room',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='time_table_api.classroom'),
        ),
        migrations.AddField(
            model_name='module',
            name='teacher',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='time_table_api.instructor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='module',
            name='time_slot',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]