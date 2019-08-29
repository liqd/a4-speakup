from django import forms
from django.utils.translation import ugettext_lazy as _

from adhocracy4.dashboard.components.forms import (ModuleDashboardFormSet,
                                                   ProjectDashboardForm)
from adhocracy4.dashboard.forms import PhaseForm
from adhocracy4.modules import models as module_models
from adhocracy4.phases import models as phase_models
from adhocracy4.projects import models as project_models
from apps.organisations.models import Organisation


class OrganisationForm(forms.ModelForm):

    class Meta:
        model = Organisation
        fields = ['name']
        labels = {
            'name': _('Organisation name')
        }


class ProjectBasicForm(ProjectDashboardForm):

    class Meta:
        model = project_models.Project
        fields = ['name', 'description', 'information']
        required_for_project_publish = ['name', 'description', 'information']
        help_texts = {
            'name': '',
            'description': '',
            'information': ''
        }
        labels = {
            'name': _('Title'),
            'description': _('Short description'),
            'information': _('description')
        }


class SpeakupPhaseForm(PhaseForm):

    class Meta:
        model = phase_models.Phase
        fields = ['start_date', 'end_date',
                  'type',  # required for get_phase_name in the tpl
                  ]
        required_for_project_publish = ['start_date',
                                        'end_date']
        widgets = {
            'type': forms.HiddenInput(),
            'weight': forms.HiddenInput()
        }


SpeakupPhaseFormSet = forms.inlineformset_factory(
    module_models.Module,
    phase_models.Phase,
    form=SpeakupPhaseForm,
    formset=ModuleDashboardFormSet,
    extra=0,
    can_delete=False,
)
