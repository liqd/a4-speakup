from adhocracy4.dashboard.blueprints import ProjectBlueprint
from django.utils.translation import ugettext_lazy as _

from apps.questions import phases as question_phases

blueprints = [
    ('speakup',
     ProjectBlueprint(
         title=_('Speak Up'),
         description=_(
             'Collect questions for your discussion.'
         ),
         content=[
             question_phases.IssuePhase(),
         ],
         image='images/brainstorming.svg',
         settings_model=None,
     )),


]
