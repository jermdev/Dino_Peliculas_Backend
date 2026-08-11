import { Show } from '@/domain/entities/Show.js'

export const sortByTitle = (items: Show[], queryTitle: string): Show[] => {
  const query = queryTitle.toLowerCase().trim()

  const getScore = (title: string): number => {
    const t = title.toLowerCase()

    if (t === query) return 0        // coincidencia exacta -> máxima prioridad
    if (t.startsWith(query)) return 1 // empieza con la query
    if (t.includes(query)) return 2   // la contiene en cualquier parte
    return 3                          // no coincide directamente
  }

  return [...items].sort((a, b) => {
    const scoreA = getScore(a.title)
    const scoreB = getScore(b.title)

    if (scoreA !== scoreB) {
      return scoreA - scoreB
    }

    // desempate alfabético dentro del mismo nivel de relevancia
    return a.title.localeCompare(b.title)
})}