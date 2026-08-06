import { CategoryCatalogo } from '@/domain/entities/CategoryCatalogo.js'
import type { CategoryCatalogoRepository } from '@/domain/ports/CategoryCatalogoRepository.js'
import { prisma } from '@/lib/prisma.js'

export class PrismaCategoryCatalogoRepository implements CategoryCatalogoRepository {
  async saveCategoryCatalogo(categoryCatalogo: CategoryCatalogo): Promise<void> {
    const categories = categoryCatalogo.getCatalogoOfCategorys()

    for (const categoria of categories) {
      await this.saveCategory(categoria)
    }
  }

  async saveCategory(categoria: string): Promise<void> {
    await prisma.category.upsert({
      where: { name: categoria },
      create: { name: categoria },
      update: {},
    })
  }

  async getCategoryCatalogo(): Promise<readonly string[]> {
    const records = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { name: true },
    })

    return records.map((record) => record.name)
  }
}
