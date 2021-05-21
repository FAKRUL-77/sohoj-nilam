from copy import copy

from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from product.forms import ProductForm
from product.models import Product
from user.models import Bid


def home(request):

    if not request.user.is_authenticated:
        return render(request, 'user/login.html')

    prod = Product.objects.order_by()
    paginator = Paginator(prod, 6)
    page = request.GET.get('page')
    paged_prod = paginator.get_page(page)
    data = {
        'products': paged_prod,
    }
    return render(request, 'product/home.html', data)


def myProduct(request):
    if not request.user.is_authenticated:
        return render(request, 'user/login.html')

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
    bids = Bid.objects.all().order_by('-bid_price')

    data = {
        'product': prod,
        'bids': bids,
        'winer': bids[0].user.username,
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
