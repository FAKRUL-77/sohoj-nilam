from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import CreateUserForm
# Create your views here.


def loginORRegister(request):
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = ""
            user = authenticate(username=email, password=raw_password)
            if not user:
                user = User.objects.create_user(username=email, email='', password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = CreateUserForm()
    return render(request, 'user/login.html', {'form': form})


def Logout(request):
    logout(request)
    return HttpResponseRedirect(settings.LOGOUT_REDIRECT_URL)


