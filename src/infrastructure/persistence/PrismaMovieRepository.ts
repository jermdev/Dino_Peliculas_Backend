import { Prisma } from '@prisma/client'
import { Movie } from '@/domain/entities/Movie.js'
import type { MovieRepository } from '@/domain/ports/MovieRepository.js'
import { PathUrl } from '@/domain/value-objects/PathUrl.js'
import { prisma } from '@/lib/prisma.js'

type MovieWithCategories = Prisma.MovieGetPayload<{
  include: { categories: true }
}>

export class PrismaMovieRepository implements MovieRepository {
  async save(movie: Movie): Promise<void> {
    const categories = movie.categories.map((category) => category.trim()).filter(Boolean)

    await prisma.movie.upsert({
      where: { id: movie.id },
      create: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        originalNumIdFromOriginalSource: movie.originalNumIdFromOriginalSource,
        originalAlphIdFromOriginalSource: movie.originalAlphIdFromOriginalSource,
        urlMedia: movie.urlMedia,
        urlHorizontalPoster: movie.urlHorizontalPoster,
        urlVerticalPoster: movie.urlVerticalPoster,
        subtitles: movie.subtitles,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
      },
      update: {
        title: movie.title,
        description: movie.description,
        originalNumIdFromOriginalSource: movie.originalNumIdFromOriginalSource,
        originalAlphIdFromOriginalSource: movie.originalAlphIdFromOriginalSource,
        urlMedia: movie.urlMedia,
        urlHorizontalPoster: movie.urlHorizontalPoster,
        urlVerticalPoster: movie.urlVerticalPoster,
        subtitles: movie.subtitles,
        categories: {
          deleteMany: {},
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
      },
    })
  }

  async findById(id: string): Promise<Movie | null> {
    const record = await prisma.movie.findUnique({
      where: { id },
      include: { categories: true },
    })

    return record ? this.toDomain(record) : null
  }

  async findAll(opts?: { limit?: number; offset?: number }): Promise<Movie[]> {
    const records = await prisma.movie.findMany({
      include: { categories: true },
      take: opts?.limit ?? 100,
      skip: opts?.offset ?? 0,
      orderBy: { title: 'asc' },
    })

    return records.map((record) => this.toDomain(record))
  }

  async delete(id: string): Promise<void> {
    await prisma.movie.delete({
      where: { id },
    })
  }

  async searchByTitle(query: string, limit: number): Promise<Movie[]> {
    const records = await prisma.movie.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: { categories: true },
      take: limit,
      orderBy: { title: 'asc' },
    })

    return records.map((record) => this.toDomain(record))
  }

  async findByOriginalSourceId(originalNumId: number): Promise<Movie | null> {
    const record = await prisma.movie.findFirst({
      where: {
        originalNumIdFromOriginalSource: originalNumId,
      },
      include: { categories: true },
    })

    return record ? this.toDomain(record) : null
  }

  private toDomain(record: MovieWithCategories): Movie {
    const input: ConstructorParameters<typeof Movie>[0] = {
      id: record.id,
      title: record.title,
      description: record.description,
      categories: record.categories.map((category) => category.name),
      originalNumIdFromOriginalSource: record.originalNumIdFromOriginalSource,
      originalAlphIdFromOriginalSource: record.originalAlphIdFromOriginalSource,
      urlMedia: new PathUrl(record.urlMedia ?? ''),
      urlHorizontalPoster: new PathUrl(record.urlHorizontalPoster ?? ''),
      urlVerticalPoster: new PathUrl(record.urlVerticalPoster ?? ''),
    }

    if (record.subtitles !== null && record.subtitles !== undefined) {
      input.subtitles = record.subtitles
    }

    return new Movie(input)
  }
}
