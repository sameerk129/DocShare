"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from notes import urls as notes_urls
from folders import urls as folder_urls
from rest_framework.authtoken import views as rest_framework_view
from auth.views import LogoutUser

admin.site.site_title = "DocShare"
admin.site.site_header = "DocShare"

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/login/$', rest_framework_view.obtain_auth_token, name='login'),
    url(r'^api/logout/$', LogoutUser.as_view(), name='logout'),
    url(r'^api/notes/', include(notes_urls)),
    url(r'^api/folders/', include(folder_urls)),
]
