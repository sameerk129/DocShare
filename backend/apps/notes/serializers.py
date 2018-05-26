from rest_framework.serializers import Serializer, CharField, IntegerField, BooleanField


class NotesSerializer(Serializer):
    id = IntegerField()
    title = CharField()
    content = CharField()
    contents = CharField()
    public = BooleanField()
