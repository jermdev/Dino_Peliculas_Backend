import {z} from 'zod';

const MAX_NUM_SHOWS_FOR_CATALAGO_QUERY: number = 50;
const DEFAULT_NUM_SHOWS_FOR_CATALOGO_QUERY: number = 20;


export const CatalogQuerySchema = z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(MAX_NUM_SHOWS_FOR_CATALAGO_QUERY).default(DEFAULT_NUM_SHOWS_FOR_CATALOGO_QUERY),
})

const MAX_NUM_SHOWS_FOR_AUTOCOMPLETE_QUERY: number = 50;
const DEFAULT_NUM_SHOWS_FOR_AUTOCOMPLETE_QUERY: number = 20;

export const AutocompleteQuerySchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(MAX_NUM_SHOWS_FOR_AUTOCOMPLETE_QUERY).default(DEFAULT_NUM_SHOWS_FOR_AUTOCOMPLETE_QUERY),
});

// Para GET /api/content/:id
export const ContentParamsSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]+$/), // Si usas UUID
})

// Para GET /api/content/:id/recommendations
export const RecommendationParamsSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]+$/), // Si usas UUID
});

const MAX_NUM_SHOWS_FOR_RECOMENDATION_QUERY: number = 30;
const DEFAULT_NUM_SHOWS_FOR_RECOMENDATION_QUERY: number = 10;
export const RecommendationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(MAX_NUM_SHOWS_FOR_RECOMENDATION_QUERY).default(DEFAULT_NUM_SHOWS_FOR_RECOMENDATION_QUERY),
});

export const CreateMovieSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  urlHorizontalPoster: z.string().min(1),
  urlVerticalPoster: z.string().min(1),
  urlMedia: z.string().min(1),
  categories: z.array(z.string().min(1)).nonempty(),
  originalNumIdFromOriginalSource: z.coerce.number().int().nonnegative(),
  originalAlphIdFromOriginalSource: z.string().min(1),
  subtitles: z.string().optional(),
})

export const UpdateMovieContentSchema = CreateMovieSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'Debe proporcionarse al menos un campo para actualizar' }
)

export type UpdateMovieContentDTO = z.infer<typeof UpdateMovieContentSchema>
