import type { UpdateMovieContentDTO } from '@/application/types/update-covie-content.js'
import type { UpdatedMovieResponse } from '@/domain/types/UpdateMovieResponse.js'


export interface UpdateMovie {
    updateMediaUrl(id: string, update: UpdateMovieContentDTO ):Promise<UpdatedMovieResponse | null>;
}