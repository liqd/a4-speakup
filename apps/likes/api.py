from django.contrib.sessions.models import Session
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.questions.models import Question

from .models import Like


class LikeView(APIView):

    parser_classes = (JSONParser,)

    def post(self, request, format=None):

        if not request.session.session_key:
            request.session.create()

        try:
            question_id = request.data['id']
            like_value = bool(request.data['value'])

            question = Question.objects.get(id=question_id)
            session = Session.objects.get(
                session_key=request.session.session_key)

            if like_value:
                Like.objects.get_or_create(session=session, question=question)
            else:
                Like.objects.get(session=session, question=question).delete()

            return Response(status=status.HTTP_200_OK)
        except (ValueError, Question.DoesNotExist, Session.DoesNotExist):
            return Response(status=status.HTTP_400_BAD_REQUEST)
