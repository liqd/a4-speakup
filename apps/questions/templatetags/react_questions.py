import json

from django import template
from django.core.urlresolvers import reverse
from django.utils.html import format_html

register = template.Library()


@register.simple_tag(takes_context=True)
def react_questions(context, obj):
    request = context['request']

    user = request.user
    is_moderator = user.is_superuser or user in obj.project.moderators.all()

    questions_api_url = reverse('questions-list', kwargs={'module_pk': obj.pk})

    attributes = {
        'questions_api_url': questions_api_url,
        'isModerator': is_moderator
    }

    return format_html(
        '<div data-speakup-widget="questions" '
        'data-attributes="{attributes}"></div>',
        attributes=json.dumps(attributes)
    )
