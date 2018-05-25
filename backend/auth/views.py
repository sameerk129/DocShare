# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class SampleClass(APIView):

    def get(self, request, format=None):
        return Response({"Hello": "world"})
