import rules

from adhocracy4.phases.predicates import has_feature_active


def phase_allows_like(item_class):
    @rules.predicate
    def _add_predicate(user, module):
        if module:
            return has_feature_active(module, item_class, 'like')
        return False
    return _add_predicate
