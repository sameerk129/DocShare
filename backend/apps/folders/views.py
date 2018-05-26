# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Folder
from .serializers import FolderSerializer, FolderNoteSerializer
from ..notes.models import Notes
from ..notes.serializers import NotesSerializer

from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404, render_to_response

# Create your views here.


class FoldersList(APIView):

    def get(self, request, **kwargs):
        folder = Folder.objects.filter(**request.query_params)
        serializer = FolderSerializer(folder, many=True)
        return Response(serializer.data)

    def post(self, request, **kwargs):
        print "request.data is:" % request.data
        folder = Folder.objects.create(title=request.data.get('title'))
        serializer = FolderSerializer(folder)
        return Response(serializer.data)


class FolderObj(APIView):

    def get(self, request, **kwargs):
        folder = get_object_or_404(Folder, id=kwargs['folder_id'])
        serializer = FolderSerializer(folder)
        return Response(serializer.data)

    def put(self, request, **kwargs):
        folder = get_object_or_404(Folder, id=kwargs['folder_id'])
        folder.title = request.data.get('title')
        folder.save()
        serializer = FolderSerializer(folder)
        return Response(serializer.data)

class FolderNotesList(APIView):

    def get(self, request, **kwargs):
        print "kwargs are: %s" % kwargs
        folder = get_object_or_404(Folder, id=kwargs['folder_id'])
        print "folder is: %s" % folder
        serialized = FolderNoteSerializer(folder)
        print "data is: %s" % serialized.data
        return Response(serialized.data)

    def post(self, request, **kwargs):
        print "kwargs are: %s" % kwargs
        folder = get_object_or_404(Folder, id=kwargs['folder_id'])
        note = Notes.objects.create(
            contents=request.data.get('contents'),
            title=request.data.get('title'),
            public=request.data.get('public')
        )
        folder.notes.add(note)
        folder.save()
        # note.update(**kwargs)
        serializer = NotesSerializer(note)
        return Response(serializer.data)


class FolderNote(APIView):

    def get(self, request, **kwargs):
        folder = get_object_or_404(Folder, id=kwargs['folder_id'])
        note = get_object_or_404(folder.notes, id=kwargs['note_id'])
        serialized = NotesSerializer(note)
        print "data is: %s" % serialized.data
        return Response(serialized.data)

    def put(self, request, **kwargs):
        print "kwargs are: %s" % kwargs
        note = get_object_or_404(Notes, id=kwargs['note_id'])
        # import pdb; pdb.set_trace()
        # note.public = request.data.get('public')
        note.contents = request.data.get('contents')
        note.title = request.data.get('title')
        note.public = request.data.get('public')
        note.save()
        # note.update(**kwargs)
        serializer = NotesSerializer(note)
        return Response(serializer.data)


class FolderNotes(APIView):

    def get(self, request, **kwargs):
        print "kwargs are: %s" % kwargs
        return Response([{"Hello": "World"}])


def renderTemplate(request):
    # template = loader.get_template("auth/templates/index.html")
    # return HttpResponse(template.render)
    return render_to_response("folders/index.html")
