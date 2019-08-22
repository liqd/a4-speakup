from django.utils.translation import ugettext_lazy as _

from adhocracy4.dashboard import (ModuleFormSetComponent, ProjectFormComponent,
                                  components)

from . import forms


class ProjectBasicComponent(ProjectFormComponent):
    identifier = 'speakup-basic'
    weight = 10
    label = _('Basic settings')

    form_title = _('Edit basic settings')
    form_class = forms.ProjectBasicForm
    form_template_name = 'a4dashboard/includes/project_basic_form.html'

    def is_effective(self, project):
        return True


class ModulePhasesComponent(ModuleFormSetComponent):
    identifier = 'speakup-phases'
    weight = 11
    label = _('Phases')

    form_title = _('Edit phases information')
    form_class = forms.SpeakupPhaseFormSet
    form_template_name = 'a4dashboard/includes/module_phases_form.html'


components.register_project(ProjectBasicComponent())
components.register_module(ModulePhasesComponent())
