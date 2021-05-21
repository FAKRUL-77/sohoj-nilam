from django.contrib import admin
from django.utils.html import format_html

from .models import Product

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    def thumbnail(self, object):
        return format_html('<img src="{}" width="40" style="border-radius: 50px"/>'.format(object.photo.url))

    thumbnail.short_description = 'Product Image'
    list_display = ('id', 'thumbnail', 'name', 'min_bid_price', 'category', 'auction_end_date_time')
    list_display_links = ('thumbnail', 'name')

    search_fields = ('id', 'name', 'category')
    list_filter = ('name', 'category')


admin.site.register(Product, ProductAdmin)
