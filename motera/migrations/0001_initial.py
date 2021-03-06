# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-03-12 10:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('birth_date', models.DateField()),
                ('birth_place', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Cast',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('artist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Artist')),
            ],
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('artist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Artist')),
            ],
        ),
        migrations.CreateModel(
            name='Genere',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genere', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('plot', models.TextField()),
                ('rating', models.DecimalField(decimal_places=3, max_digits=5)),
                ('duration_in_minutes', models.IntegerField()),
                ('budget', models.DecimalField(decimal_places=2, max_digits=15)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='MovieGenere',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('genere_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Genere')),
                ('movie_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('movie_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieTrailer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('movie_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='Writer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('artist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Artist')),
                ('movie_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie')),
            ],
        ),
        migrations.AddField(
            model_name='director',
            name='movie_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie'),
        ),
        migrations.AddField(
            model_name='cast',
            name='movie_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='motera.Movie'),
        ),
    ]
