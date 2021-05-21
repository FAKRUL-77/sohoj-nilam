from django.contrib import admin

# Register your models here.
from user.models import MyUser, Bid

admin.site.register(MyUser)
admin.site.register(Bid)