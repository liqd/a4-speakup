import rules
from rules.predicates import is_superuser

from adhocracy4.organisations.predicates import is_initiator
from adhocracy4.projects.predicates import (is_live, is_member, is_moderator,
                                            is_public)

rules.remove_perm('a4projects.view_project')
rules.add_perm('a4projects.view_project',
               is_superuser | is_initiator | is_moderator
               | ((is_public | is_member) & is_live))
