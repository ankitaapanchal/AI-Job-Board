# Generated by Django 5.1.6 on 2025-03-22 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0003_alter_job_salary'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='comapany',
            new_name='company',
        ),
    ]
