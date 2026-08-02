import type { Show } from '@/domain/entities/Show.ts'

export interface HomeFeedSection {
  title: string
  items: Show[]
}
