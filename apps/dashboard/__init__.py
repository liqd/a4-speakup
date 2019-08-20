from adhocracy4.dashboard import ProjectDashboard, components

default_app_config = 'apps.dashboard.apps.Config'


class SpeakUpDashboard(ProjectDashboard):

    def get_project_components(self):
        return [
            components.projects.get('speakup-basic'),
            components.projects.get('moderators')
        ]

    def get_module_components(self):
        return [
            components.modules.get('phases'),
            components.modules.get('categories')
        ]
