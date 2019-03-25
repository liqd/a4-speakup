from django.core.exceptions import ValidationError
from rest_framework import mixins, viewsets

from adhocracy4.api.mixins import ModuleMixin
from adhocracy4.api.permissions import ViewSetRulesPermission

from .models import Question
from .serializers import QuestionSerializer


class QuestionViewSet(ModuleMixin,
                      mixins.ListModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet,
                      ):

    serializer_class = QuestionSerializer
    permission_classes = (ViewSetRulesPermission,)

    def get_permission_object(self):
        return self.module

    def get_queryset(self):
        qs = Question\
            .objects\
            .filter(module=self.module)\
            .order_by('created')
        is_answered = self.request.query_params.get('is_answered', None)
        if is_answered:
            try:
                return qs.filter(is_answered=is_answered)
            except ValidationError:
                return qs
        return qs
