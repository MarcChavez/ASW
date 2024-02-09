# Generated by Django 4.1.7 on 2023-05-01 20:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='Images/')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('creator', models.CharField(max_length=100)),
                ('status', models.IntegerField(choices=[(1, 'New'), (2, 'In progress'), (3, 'Ready for test'), (4, 'Closed'), (5, 'Needs info'), (6, 'Rejected'), (7, 'Postponed')])),
                ('type', models.IntegerField(choices=[(1, 'Bug'), (2, 'Question'), (3, 'Disabled')])),
                ('severity', models.IntegerField(choices=[(1, 'Whishlist'), (2, 'Minor'), (3, 'Normal'), (4, 'Important'), (5, 'Critical')])),
                ('priority', models.IntegerField(choices=[(1, 'Low'), (2, 'Normal'), (3, 'High')])),
                ('creationdate', models.DateTimeField(auto_now_add=True)),
                ('modifieddate', models.DateTimeField(auto_now=True)),
                ('deadlinedate', models.DateTimeField(blank=True, null=True)),
                ('deadlinemotive', models.CharField(max_length=100)),
                ('blocked', models.BooleanField(default=False)),
                ('blockmotive', models.CharField(blank=True, default=False, max_length=100, null=True)),
                ('deadline', models.BooleanField(default=False)),
                ('asignedTo', models.ManyToManyField(blank=True, related_name='assigned_issues', to=settings.AUTH_USER_MODEL)),
                ('watchers', models.ManyToManyField(blank=True, related_name='watchers_issue', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=100)),
                ('creationDate', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blacklotus.issue')),
            ],
        ),
        migrations.CreateModel(
            name='Attachments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('archivo', models.FileField(upload_to='Attachments/')),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('username', models.CharField(max_length=100)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blacklotus.issue')),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationdate', models.DateTimeField(auto_now_add=True)),
                ('field', models.CharField(max_length=100)),
                ('change', models.CharField(max_length=100)),
                ('old', models.CharField(max_length=100)),
                ('issueChanged', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blacklotus.issue')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]