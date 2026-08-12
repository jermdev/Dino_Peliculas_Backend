export type CategoryLike = string | { name: string }

export interface Rankable {
  title: string
  categories: CategoryLike[]
}

export function categoryName(category: CategoryLike): string {
  return typeof category === 'string' ? category : category.name
}