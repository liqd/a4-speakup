import rules
from rules.predicates import is_superuser

from adhocracy4.modules.predicates import (is_context_initiator,
                                           is_context_member,
                                           is_context_moderator, is_owner)
from adhocracy4.phases.predicates import (phase_allows_add,
                                          phase_allows_change,
                                          phase_allows_rate)

from .models import Question

rules.add_perm('a4-speakup_questions.rate_question', phase_allows_rate)


rules.add_perm('a4-speakup_questions.modify_question',
               is_superuser | is_context_moderator | is_context_initiator
               | (is_context_member & is_owner & phase_allows_change))


rules.add_perm('a4-speakup_questions.propose_question',
               phase_allows_add(Question))


rules.add_perm('a4-speakup_questions.view_question', rules.always_allow)
