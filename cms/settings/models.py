from django.db import models
from wagtail.admin.edit_handlers import PageChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting


@register_setting
class HelpPages(BaseSetting):
    terms_of_use_page = models.ForeignKey(
        'wagtailcore.Page',
        related_name="help_page_terms_of_use_page",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="Please add a link to the page that explains the terms of condition here.")
    privacy_policy = models.ForeignKey(
        'wagtailcore.Page',
        related_name="help_page_privacy_policy",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        help_text="Please add a link to the page that explains the privacy policy here.")

    panels = [
        PageChooserPanel('terms_of_use_page'),
        PageChooserPanel('privacy_policy')
    ]
