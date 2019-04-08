import rules

from .predicates import phase_allows_like

rules.add_perm('a4-speakup_likes.add_like', phase_allows_like)
