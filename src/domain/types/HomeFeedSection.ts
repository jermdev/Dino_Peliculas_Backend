import type { Show } from '@/domain/entities/Show.js'
import type { OverViewMovie } from '@/application/types/overView-Movie.js'

export interface HomeFeedSection {
  title: string
  items: OverViewMovie[]
}
