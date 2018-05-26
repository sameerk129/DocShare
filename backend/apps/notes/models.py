# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from tinymce import models as tinymce_models

# Create your models here.


class Notes(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    public = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    folder = models.ForeignKey("folders.Folder", related_name="notes", null=True)
    contents = tinymce_models.HTMLField(null=True)

    def __unicode__(self):
        return "%s" % self.title

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'