from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Question
        exclude = ('module', 'created', 'modified')

    def get_likes(self, question):
        session = self.context['request'].session.session_key
        like_count = question.like_set.all().count()

        session_like = bool(question.like_set.filter(session=session).first())

        result = {
            'count': like_count,
            'session_like': session_like
        }

        return result
