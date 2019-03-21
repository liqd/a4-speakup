from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Question
        exclude = ('module', 'created', 'modified')
