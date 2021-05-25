import datetime
from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models

from ckeditor.fields import RichTextField

# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = RichTextField()
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    min_bid_price = models.IntegerField()
    category = models.CharField(max_length=100)
    auction_creation_date_time = models.DateTimeField(auto_now_add=True)
    auction_end_date_time = models.DateTimeField(auto_now_add=True)
    is_running = models.BooleanField(default=True)

    def remaining_time(self):
        time = self.auction_end_date_time - timezone.now()
        if time.days < 0:
            self.is_running = False
            return False
        else:
            return time

    def __str__(self):
        return self.name
