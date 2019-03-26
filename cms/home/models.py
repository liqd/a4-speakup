from django.db import models
from wagtail.admin import edit_handlers
from wagtail.core import blocks, fields
from wagtail.core.models import Page


class HomePage(Page):
    body = fields.StreamField([
        ('paragraph', blocks.RichTextBlock())
    ])

    content_panels = [
        edit_handlers.FieldPanel('title'),
        edit_handlers.StreamFieldPanel('body'),
    ]

    subpage_types = ['cms_home.SimplePage']


class SimplePage(Page):
    body = fields.RichTextField(blank=True)

    content_panels = [
        edit_handlers.FieldPanel('title'),
        edit_handlers.FieldPanel('body'),
    ]

    subpage_types = []
