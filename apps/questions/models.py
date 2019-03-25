from django.contrib.auth.models import AnonymousUser
from django.db import models

from adhocracy4.categories.fields import CategoryField
from adhocracy4.models.base import TimeStampedModel
from adhocracy4.modules import models as module_models


class AnonymousItem(TimeStampedModel):
    module = models.ForeignKey(module_models.Module, on_delete=models.CASCADE)

    @property
    def project(self):
        return self.module.project

    @property
    def creator(self):
        return AnonymousUser()

    @creator.setter
    def creator(self, value):
        pass

    class Meta:
        abstract = True


class Question(AnonymousItem):
    text = models.TextField(max_length=1000)
    is_answered = models.BooleanField(default=False)
    is_favourite = models.BooleanField(default=False)

    category = CategoryField()

    def __str__(self):
        return self.id

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('project-detail', args=[str(self.project.slug)])
