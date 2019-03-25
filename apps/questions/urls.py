from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'create/module/(?P<slug>[-\w_]+)/$',
        views.QuestionCreateView.as_view(), name='question-create'),
]
