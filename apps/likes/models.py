from django.contrib.sessions.models import Session
from django.db import models

from apps.questions.models import Question


class Like(models.Model):
    session = models.ForeignKey(Session)
    question = models.ForeignKey(Question, related_name='question_likes')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('session', 'question')
