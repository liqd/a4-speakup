from django.contrib.sessions.models import Session
from django.db import models

from apps.questions.models import Question


class Like(models.Model):
    session = models.ForeignKey(Session)
    question = models.ForeignKey(Question)
    created = models.DateTimeField(auto_now_add=True)
