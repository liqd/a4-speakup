import json

from django import template
from django.core.urlresolvers import reverse
from django.utils.html import format_html

from adhocracy4.rules.discovery import NormalUser

register = template.Library()


@register.simple_tag(takes_context=True)
def react_questions(context, obj):
    request = context['request']

    user = request.user
    is_moderator = user.is_superuser or user in obj.project.moderators.all()
    categories = [category.name for category in obj.category_set.all()]
    questions_api_url = reverse('questions-list', kwargs={'module_pk': obj.pk})

    permission = 'a4-speakup_questions.rate_question'
    has_rating_permission = user.has_perm(
        permission, obj)
    would_have_rating_permission = NormalUser().would_have_perm(
        permission, obj
    )

    attributes = {
        'questions_api_url': questions_api_url,
        'isModerator': is_moderator,
        'categories': categories,
        'hasRatingPermission': (has_rating_permission
                                or would_have_rating_permission)
    }

    return format_html(
        '<div data-speakup-widget="questions" '
        'data-attributes="{attributes}"></div>',
        attributes=json.dumps(attributes)
    )


@register.simple_tag(takes_context=True)
def react_questions_statistics(context, obj):

    categories = [category.name for category in obj.category_set.all()]
    questions_api_url = reverse('questions-list', kwargs={'module_pk': obj.pk})

    attributes = {
        'questions_api_url': questions_api_url,
        'categories': categories
    }

    return format_html(
        '<div data-speakup-widget="statistics" '
        'data-attributes="{attributes}"></div>',
        attributes=json.dumps(attributes)
    )
