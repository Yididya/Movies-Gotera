from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Movie(models.Model):
	title = models.CharField(max_length=100)
	plot = models.TextField()
	rating = models.DecimalField(max_digits=5,decimal_places=3)
	duration_in_minutes = models.IntegerField()
	budget = models.DecimalField(max_digits=15,decimal_places=2)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()


	def __str__(self):
		return self.title
class Genere(models.Model):

	genere = models.CharField(max_length=100)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()

	def __str__(self):
		return self.genere

class MovieGenere(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE,
		)
	genere_id = models.ForeignKey(
			'Genere',
			on_delete=models.CASCADE,
		)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()
class Cast(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE,
		)
	artist_id = models.ForeignKey(
			'Artist',
			on_delete=models.CASCADE
		)
	role = models.CharField(max_length=100)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()
class Director(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE,
		)
	artist_id = models.ForeignKey(
			'Artist',
			on_delete=models.CASCADE
		)
	
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()
class Artist(models.Model):
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	birth_date = models.DateField()
	birth_place = models.CharField(max_length=100)

	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()
	def __str__(self):
		return self.first_name +" "+ self.last_name 
class Writer(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE,
		)
	artist_id = models.ForeignKey(
			'Artist',
			on_delete=models.CASCADE
		)
	
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()


class MovieTrailer(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE,
		)
	url = models.CharField(max_length=500)
	
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()
class MovieTag(models.Model):
	movie_id = models.ForeignKey(
			'Movie',
			on_delete=models.CASCADE
		)
	tag = models.CharField(max_length=100)
	created_at = models.DateTimeField()
	updated_at = models.DateTimeField()


