from django.utils.translation import ugettext_lazy as _

from adhocracy4 import phases

from . import apps, models, views


class IssuePhase(phases.PhaseContent):
    app = apps.Config.label
    phase = 'issue'
    view = views.QuestionListView

    name = _('Issue phase')
    description = _('Add question.')
    module_name = _('Speak Up')
    icon = 'lightbulb-o'

    features = {
        'crud': (models.Question,),
    }

phases.content.register(IssuePhase())