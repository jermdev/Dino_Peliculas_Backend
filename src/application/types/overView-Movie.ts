interface category {
  id: number
  name: string
}

export interface OverViewMovie {
  id: string
  title: string
  categories: category[]
  urlVerticalPoster: string 
  urlHorizontalPoster: string
}