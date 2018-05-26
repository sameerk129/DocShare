from django.conf.urls import url, include

from .views import NotesList, NoteObject

urlpatterns = [
    url(r'^$', NotesList.as_view(), name='notes_list'),
    url(r'^(?P<note_id>\d+)/', NoteObject.as_view(), name='note_obj'),
]