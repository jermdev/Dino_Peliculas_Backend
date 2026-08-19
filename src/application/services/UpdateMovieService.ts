import type { UpdateMovie } from '@/domain/ports/UpdateMovie.js'
import type { UpdateMovieContentDTO } from '@/application/types/update-covie-content.js'
import type { UpdatedMovieResponse } from '@/domain/types/UpdateMovieResponse.js'
import type { MovieRepository } from '@/domain/ports/MovieRepository.js'



export class UpdateMovieService implements UpdateMovie {
    constructor(private readonly movieRepository: MovieRepository) {}

    async updateMediaUrl(id: string , update: UpdateMovieContentDTO):Promise<UpdatedMovieResponse | null> {
        try {
            const updatedMovie = await this.movieRepository.update(id, update);

            
            if (!updatedMovie) {
                throw new Error(`Movie with id ${id} not found`)
            }

            return {
                id: updatedMovie.id,
                categories: updatedMovie.categories,
                description: updatedMovie.description,
                originalAlphIdFromOriginalSource: updatedMovie.originalAlphIdFromOriginalSource,
                title: updatedMovie.title,
                originalNumIdFromOriginalSource: updatedMovie.originalNumIdFromOriginalSource,
                urlHorizontalPoster: updatedMovie.urlHorizontalPoster,
                urlMedia: updatedMovie.urlMedia,
                urlVerticalPoster: updatedMovie.urlVerticalPoster
                
            }
        
        } catch (error) {
            throw new Error("Error en la UpdateMovie, ejecutando el metodo updateMediaUrl \n" + error);
        }
        

        
    }

}