from django.utils.html import mark_safe
from django.utils.translation import ugettext_lazy as _
from wagtail.core.models import Site

from cms.settings.models import HelpPages

LINK_TEXT = _('I have read and accept the {}terms of use{} and the {}privacy policy{}.')


def add_link_to_helptext(help_page_name, help_page_name_2, link_text=None):
    site = Site.objects.filter(
        is_default_site=True
    ).first()
    help_pages = HelpPages.for_site(site)

    if getattr(help_pages, help_page_name) and \
       getattr(help_pages, help_page_name).live and \
       getattr(help_pages, help_page_name_2) and \
       getattr(help_pages, help_page_name_2).live:
        url = getattr(help_pages, help_page_name).url
        url_2 = getattr(help_pages, help_page_name_2).url

        if not link_text:
            link_text = LINK_TEXT
        link_text = link_text \
            .format('<a href="' + url + '" target="_blank">', '</a>', '<a href="' + url_2 + '" target="_blank">', '</a>')
        return mark_safe(link_text)
    elif getattr(help_pages, help_page_name) and \
         getattr(help_pages, help_page_name).live:
          url = getattr(help_pages, help_page_name).url
          if not link_text:
              link_text = LINK_TEXT
          link_text = link_text \
              .format('<a href="' + url + '" target="_blank">', '</a>', '', '')
          return mark_safe(link_text)
    elif getattr(help_pages, help_page_name_2) and \
         getattr(help_pages, help_page_name_2).live:
          url_2 = getattr(help_pages, help_page_name_2).url
          if not link_text:
              link_text = LINK_TEXT
          link_text = link_text \
              .format('', '', '<a href="' + url + '" target="_blank">', '</a>')
          return mark_safe(link_text)

    return LINK_TEXT.format('', '', '', '')
