from rest_framework import serializers
from .models import Receipt, Recipient, Organization


class OrganizationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'


class OrganizationPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['name', 'address', 'contact_email', 'contact_number', 'website', 'logo', 'description']


class OrganizationPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['address', 'contact_email', 'contact_number', 'website', 'logo', 'description']


class ReceiptGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'


class ReceiptPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['organization', 'recipient_name', 'amount', 'billing_address', 'description']


class ReceiptPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['recipient_name', 'amount', 'billing_address', 'description']
