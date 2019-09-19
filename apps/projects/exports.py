from django.utils.translation import ugettext as _
from rules.contrib.views import PermissionRequiredMixin

from adhocracy4.exports import mixins as export_mixins
from adhocracy4.exports import views as export_views
from apps.questions.models import Question


class QuestionsDashboardExportView(
        PermissionRequiredMixin,
        export_mixins.ExportModelFieldsMixin,
        export_views.BaseItemExportView
):

    model = Question

    fields = [
        'id',
        'text',
        'created',
        'is_answered',
        'is_on_shortlist',
        'is_hidden',
        'category'
    ]
    permission_required = 'a4projects.change_project'

    def get_permission_object(self):
        return self

    def get_queryset(self):
        return Question.objects.filter(module__project=self.project)

    def get_virtual_fields(self, virtual):
        virtual.setdefault('id', _('ID'))
        virtual.setdefault('text', _('Text'))
        virtual['like_count'] = _('Likes')
        virtual.setdefault('category', _('Category'))
        virtual.setdefault('is_answered', _('Answered'))
        virtual.setdefault('is_on_shortlist', _('On shortlist'))
        virtual.setdefault('is_hidden', _('Hidden'))
        virtual.setdefault('created', _('Created'))
        return super().get_virtual_fields(virtual)

    def get_like_count_data(self, question):
        return len(question.question_likes.all())

    @property
    def raise_exception(self):
        return self.request.user.is_authenticated
