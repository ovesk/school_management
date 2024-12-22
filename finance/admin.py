from django.contrib import admin
from .models import Organization, Receipt


class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'contact_number')
    search_fields = ('name', 'address','contact_number')
    list_filter = ('name',)

class ReceiptAdmin(admin.ModelAdmin):
    list_display = ('organization', 'recipient_name', 'amount', 'description')
    search_fields = ('recipient_name', 'organization__name')
    list_filter = ('organization',)

admin.site.register(Organization, OrganizationAdmin)
admin.site.register(Receipt, ReceiptAdmin)