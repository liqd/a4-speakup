import rules

from adhocracy4.phases.predicates import has_feature_active


def phase_allows_rate(item_class):
    @rules.predicate
    def _add_predicate(user, module):
        if module:
            return has_feature_active(module, item_class, 'rate')
        return False
    return _add_predicate
