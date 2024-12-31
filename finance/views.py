from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import views, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Organization, Receipt
from .serializers import (
    OrganizationGetSerializer,
    OrganizationPostSerializer,
    OrganizationPutSerializer,
    ReceiptGetSerializer,
    ReceiptPostSerializer,
    ReceiptPutSerializer,
)


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


def home(request):
    return HttpResponse("Hello, Django!")


def invoice(request):
    return HttpResponse("Inside invoicing !")


class OrganizationView(generics.GenericAPIView):
    queryset = Organization.objects.all()
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['name', 'contact_email']
    search_fields = ['name', 'address', 'contact_email']
    ordering_fields = ['name', 'created_at']
    pagination_class = CustomPagination

    def get(self, request, *args, **kwargs):
        self.serializer_class = OrganizationGetSerializer
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        self.serializer_class = OrganizationPostSerializer
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, *args, **kwargs):
        self.serializer_class = OrganizationPutSerializer
        try:
            organization = Organization.objects.get(id=request.data.get('id'))
        except Organization.DoesNotExist:
            return Response({"error": "Organization not found"}, status=404)
        serializer = self.get_serializer(organization, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


class ReceiptView(generics.GenericAPIView):
    queryset = Receipt.objects.all()
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['recipient_name', 'organization__name', 'transaction_date']
    search_fields = ['recipient_name', 'billing_address', 'description']
    ordering_fields = ['transaction_date', 'amount']
    pagination_class = CustomPagination

    def get(self, request, *args, **kwargs):
        self.serializer_class = ReceiptGetSerializer
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        self.serializer_class = ReceiptPostSerializer
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, *args, **kwargs):
        self.serializer_class = ReceiptPutSerializer
        try:
            receipt = Receipt.objects.get(receipt_number=request.data.get('receipt_number'))
        except Receipt.DoesNotExist:
            return Response({"error": "Receipt not found"}, status=404)
        serializer = self.get_serializer(receipt, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)