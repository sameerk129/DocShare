from django.conf.urls import url, include

from .views import FoldersList, FolderNotesList, FolderNote

urlpatterns = [
    url(r'^$', FoldersList.as_view(), name='folders-list'),
    url(r'(?P<folder_id>\d+)/notes/$', FolderNotesList.as_view(), name='folder-notes'),
    url(r'^(?P<folder_id>\d+)/notes/(?P<note_id>\d+)/$', FolderNote.as_view(), name='folder-note'),
]