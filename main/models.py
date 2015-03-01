from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.template.defaultfilters import slugify


class Artist(models.Model):
    name = models.CharField(max_length=60)
    image = models.ImageField()
    bio = models.TextField(blank=True)

    def __unicode__(self):
        return self.name


class Track(models.Model):
    title = models.CharField(max_length=60)
    titles = models.CharField(max_length=60)
    artist = models.ManyToManyField(Artist, related_name='artist_track')
    duration = models.IntegerField()
    live = models.BooleanField(default=False)
    thumbnail = models.ImageField()

    def __unicode__(self):
        return self.title


class Playlist(models.Model):
    name = models.CharField(max_length=25)
    public = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateField(auto_now=True)
    tracks = models.ForeignKey(Track, related_name='playlist_tracks')

    def __unicode__(self):
        return self.name


class Person(AbstractUser):
    avatar = models.ImageField(upload_to='/media/', default='static/img/user-avatar.png')
    bio = models.TextField(blank=True)
    playlists = models.ForeignKey(Playlist, related_name='person_playlists')
    slug = models.SlugField(unique=True)

    def save(self, **kwargs):
                self.slug = slugify(self.name)
                super(Person, self).save(**kwargs)

    def __unicode__(self):
        return self.username


class Chat(models.Model):
    author = models.ForeignKey(Person, related_name='chat_person')
    created = models.DateTimeField(auto_now=True)
    message = models.TextField()
    track = models.OneToOneField(Track, related_name='Chat_track')

    def __unicode__(self):
        return self.author


class Room(models.Model):
    name = models.CharField(max_length=25)
    creator = models.OneToOneField(Person, related_name='room_creator')
    created = models.DateTimeField(auto_now=True)
    moderators = models.ForeignKey(Person, related_name='room_moderators')
    playlist = models.OneToOneField(Playlist, related_name='room_playlist')
    chat = models.OneToOneField(Chat, related_name='room_chat')

    def __unicode__(self):
        return self.name
