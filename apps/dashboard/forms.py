from django import forms
from django.utils.translation import ugettext_lazy as _

from adhocracy4.dashboard.components.forms import ProjectDashboardForm
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
