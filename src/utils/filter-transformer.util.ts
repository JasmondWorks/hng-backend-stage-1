export function transformToMongoFilters(filters: Record<string, any>) {
  const mongoFilters: Record<string, any> = {};

  if (filters.gender) {
    mongoFilters.gender = filters.gender;
  }

  if (filters.country_id) {
    mongoFilters.country_id = filters.country_id;
  }

  if (filters.min_age || filters.max_age) {
    mongoFilters.age = {};

    if (filters.min_age) {
      mongoFilters.age.gte = filters.min_age;
    }

    if (filters.max_age) {
      mongoFilters.age.lte = filters.max_age;
    }
  }

  if (filters.age_group) {
    mongoFilters.age_group = filters.age_group;
  }

  return mongoFilters;
}
