from rest_framework.serializers import Serializer, CharField, IntegerField, ModelSerializer, StringRelatedField
from .models import Folder

from ..notes.serializers import NotesSerializer


class FolderSerializer(ModelSerializer):
    title = CharField()
    id = IntegerField()
    notes = StringRelatedField(many=True)

    class Meta:
        model = Folder
        fields = ('id', 'title', 'notes')


class FolderNoteSerializer(ModelSerializer):
    title = CharField()
    id = IntegerField()
    notes = NotesSerializer(many=True)

    class Meta:
        model = Folder
        fields = ('id', 'title', 'notes')