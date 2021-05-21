from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from product.models import Product


class MyUser(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email


class Bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    bid_price = models.IntegerField()

    def __str__(self):
        return str(self.bid_price)
