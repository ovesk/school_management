import uuid
from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Name of the organization issuing the receipt")
    address = models.TextField(help_text="Address of the organization")
    contact_email = models.EmailField(max_length=255, unique=True, help_text="Contact email of the organization")
    contact_number = models.CharField(max_length=15, unique=True, help_text="Contact number of the organization")
    website = models.URLField(max_length=255, null=True, blank=True, help_text="Website of the organization")
    logo = models.ImageField(upload_to="organization_logos/", null=True, blank=True, help_text="Logo of the organization")
    description = models.TextField(null=True, blank=True, help_text="Brief description of the organization")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the organization was added")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the organization profile was last updated")

    def __str__(self):
        return self.name


class Recipient(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Name of the recipient")
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True, help_text="Email of the recipient")
    contact_number = models.CharField(max_length=15, unique=True, null=True, blank=True, help_text="Contact number of the recipient")
    address = models.TextField(null=True, blank=True, help_text="Address of the recipient")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the recipient was added")

    def __str__(self):
        return self.name


class Receipt(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="receipts", help_text="Organization issuing the receipt")
    recipient_name = models.CharField(max_length=255, help_text="Name of the recipient")
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Transaction amount")
    transaction_date = models.DateTimeField(auto_now_add=True, help_text="Date and time of the transaction")
    billing_address = models.TextField(help_text="Billing address")
    description = models.TextField(null=True, blank=True, help_text="Description of the transaction")
    receipt_number = models.CharField(max_length=50, unique=True, default=uuid.uuid4, help_text="Unique receipt number")

    def __str__(self):
        return f"Receipt {self.receipt_number} - {self.recipient_name}"