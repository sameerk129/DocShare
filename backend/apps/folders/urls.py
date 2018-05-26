from django.conf.urls import url, include

from .views import FoldersList, FolderNotesList, FolderNote, FolderObj

urlpatterns = [
    url(r'^(?P<folder_id>\d+)/notes/(?P<note_id>\d+)/$', FolderNote.as_view(), name='folder_note'),
    url(r'(?P<folder_id>\d+)/notes/$', FolderNotesList.as_view(), name='folder_notes'),
    url(r'(?P<folder_id>\d+)/$', FolderObj.as_view(), name='folder_obj'),
    url(r'^$', FoldersList.as_view(), name='folders_list'),
]