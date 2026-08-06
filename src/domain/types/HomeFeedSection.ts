import type { Show } from '@/domain/entities/Show.js'

export interface HomeFeedSection {
  title: string
  items: Show[]
}
