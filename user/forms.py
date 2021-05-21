from django import forms
from django.forms import ModelForm

from user.models import MyUser, Bid


class CreateUserForm(forms.ModelForm):
    class Meta:
        model = MyUser
        fields = ('email',)


class PlaceBidForm(ModelForm):

    class Meta:
        model = Bid
        fields = ['bid_price', ]
