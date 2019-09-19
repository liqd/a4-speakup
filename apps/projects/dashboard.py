from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

from adhocracy4.dashboard import DashboardComponent, components

from . import exports, views


class ModeratorsComponent(DashboardComponent):
    identifier = 'moderators'
    weight = 32
    label = _('Moderators')

    def is_effective(self, project):
        return True

    def get_base_url(self, project):
        return reverse('a4dashboard:dashboard-moderators-edit', kwargs={
            'project_slug': project.slug
        })

    def get_urls(self):
        return [(
            r'^projects/(?P<project_slug>[-\w_]+)/moderators/$',
            views.DashboardProjectModeratorsView.as_view(component=self),
            'dashboard-moderators-edit'
        )]


components.register_project(ModeratorsComponent())


class ExportQuestionsComponent(DashboardComponent):
    identifier = 'questions_export'
    weight = 30
    label = _('Export Excel')

    def is_effective(self, module):
        return True

    def get_base_url(self, module):
        return reverse('a4dashboard:dashboard-questions-export', kwargs={
            'module_slug': module.slug
        })

    def get_urls(self):
        return [
            (r'^modules/(?P<module_slug>[-\w_]+)/export/$',
                views.QuestionsDashboardExportView.as_view(),
                'dashboard-questions-export'),
            (r'^modules/(?P<module_slug>[-\w_]+)/export/questions/$',
                exports.QuestionsDashboardExportView.as_view(),
                'project-questions-export'),
        ]


components.register_module(ExportQuestionsComponent())
