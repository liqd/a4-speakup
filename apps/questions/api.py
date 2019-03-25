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
        return Question\
            .objects\
            .filter(is_answered=False, module=self.module)\
            .order_by('created')
