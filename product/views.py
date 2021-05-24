import datetime
import json
from copy import copy

from django.core import serializers
from django.core.paginator import Paginator
from django.db.models import Count
from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models.functions import ExtractIsoWeekDay, ExtractDay, TruncDay
from django.utils.safestring import mark_safe

from product.forms import ProductForm
from product.models import Product
from user.models import Bid


def home(request):

    if not request.user.is_authenticated:
        return redirect('login')

    prod = Product.objects.order_by()
    paginator = Paginator(prod, 6)
    page = request.GET.get('page')
    paged_prod = paginator.get_page(page)
    data = {
        'products': paged_prod,
    }
    return render(request, 'product/home.html', data)


def myProduct(request):
    prod = Product.objects.filter(user_id=request.user.id)
    paginator = Paginator(prod, 6)
    page = request.GET.get('page')
    paged_prod = paginator.get_page(page)
    data = {
        'products': paged_prod,
    }
    return render(request, 'product/my_product.html', data)


def product_detail(request, id):
    prod = get_object_or_404(Product, pk=id)
    if request.method == 'POST' and request.POST:
        value = request.POST
        if int(value['bid_price']) >= int(prod.min_bid_price):
            prev_bid = Bid.objects.filter(user_id=request.user.id, product=prod)
            l = len(prev_bid)
            print(l)
            if l:
                instance = Bid.objects.filter(user=request.user, product=prod)
                new_value = str(value['bid_price'])
                ins_value = str(instance[0])
                if new_value > ins_value:
                    instance.update(bid_price=value['bid_price'])
            else:
                Bid.objects.create(user=request.user, product=prod, bid_price=value['bid_price'])
    bids = Bid.objects.filter(product_id=prod.id).order_by('-bid_price')

    if len(bids) > 0:
        winer = bids[0].user.username
    else:
        winer = None

    data = {
        'product': prod,
        'bids': bids,
        'winer': winer,
    }
    return render(request, 'product/product_detail.html', data)


def addProduct(request):
    if request.method == 'POST':
        instance = request.POST
        instance = copy(instance)
        instance['user'] = request.user
        files = request.FILES
        form = ProductForm(instance, files)
        if form.is_valid():
            form.save()

        return redirect('/')

    return render(request, 'product/add_product.html')


def adminDashboard(request):

    queryset = Product.objects.extra(select={'day': 'date( auction_end_date_time )'}).values('day') \
               .annotate(available=Count('auction_end_date_time'))

    import json
    data = {
        "data": list(queryset)
    }
    context = {
        'data': json.dumps(data),
    }

    return render(request, 'admin/dashboard.html', context)