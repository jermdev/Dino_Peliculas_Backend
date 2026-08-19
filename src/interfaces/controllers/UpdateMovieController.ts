import { UpdateMovieService } from '@/application/services/UpdateMovieService.js'
import { ContentParamsSchema, UpdateMovieContentSchema} from '@/interfaces/schemas/requestSchemas.js';
import { log } from 'node:console';

export class UpdateMovieController {
    constructor(private readonly updateMovieService: UpdateMovieService) {}

    async updateMovie(updateRequest: any) {
        const {id} =  ContentParamsSchema.parse(updateRequest.params);
        const dataToUpdate = UpdateMovieContentSchema.parse(updateRequest.body);

        return await this.updateMovieService.updateMediaUrl(id, dataToUpdate);
    }
}