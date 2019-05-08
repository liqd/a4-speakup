from django import forms
from django.contrib.auth import forms as auth_forms
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from cms.contrib import helpers

User = get_user_model()


class TermsSignupForm(auth_forms.UserCreationForm):
    terms_of_use = forms.BooleanField(
        error_messages={'required': _('Please accept the terms of use.')}
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['terms_of_use'].label = helpers.add_link_to_helptext(
            "terms_of_use_page", "privacy_policy")

    def signup(self, request, user):
        user.signup(
            self.cleaned_data['username'],
            self.cleaned_data['email'],
        )

    class Meta:
        model = User
        fields = ('email', 'username', 'password1', 'password2',
                  'terms_of_use')
