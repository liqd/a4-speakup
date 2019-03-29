from django.views import generic
from rules.contrib.views import PermissionRequiredMixin

from adhocracy4.modules.models import Module
from adhocracy4.projects.mixins import ProjectMixin

from . import forms
from . import models as question_models


class QuestionListView(ProjectMixin, generic.ListView):
    model = question_models.Question

    def get_queryset(self):
        return super().get_queryset().filter(module=self.module)


class QuestionCreateView(PermissionRequiredMixin, generic.CreateView):
    model = question_models.Question
    form_class = forms.QuestionForm
    permission_required = 'a4-speakup_questions.propose_question'

    def dispatch(self, *args, **kwargs):
        mod_slug = self.kwargs[self.slug_url_kwarg]
        self.module = Module.objects.get(slug=mod_slug)
        self.project = self.module.project
        return super().dispatch(*args, **kwargs)

    def get_permission_object(self, *args, **kwargs):
        return self.module

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['slug'] = self.module.slug
        context['project'] = self.project
        context['mode'] = 'create'
        return context

    def form_valid(self, form):
        self.request.session['user_category' + str(self.module.pk)] \
            = self.request.POST.get('category')
        form.instance.module = self.module
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['module'] = self.module
        if self.request.session.get('user_category' + str(self.module.pk)):
            kwargs['category_initial'] \
                = self.request.session.get('user_category'
                                           + str(self.module.pk))
        return kwargs
