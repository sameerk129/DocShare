# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notes
from .serializers import NotesSerializer
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied

# Create your views here.


class NotesList(APIView):

    def get(self, request, **kwargs):
        notes = Notes.objects.filter(**request.query_params)
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        return Response({})


class NoteObject(APIView):

    authentication_classes = ()
    permission_classes = ()

    def get(self, request, **kwargs):
        print "kwargs are: %s" % kwargs
        note = get_object_or_404(Notes, id=kwargs['note_id'])
        print "note.public is: %s" % note.public
        if not note.public:
            raise PermissionDenied()
        serializer = NotesSerializer(note)
        return Response(serializer.data)
