import rules

from adhocracy4.phases.predicates import has_feature_active


@rules.predicate
def phase_allows_like(user, item):
    if item:
        return has_feature_active(item.module, item.__class__, 'like')
    return False
