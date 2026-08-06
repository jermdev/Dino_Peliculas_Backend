import { Show } from '@/domain/entities/Show.js'
import type { MovieReproductionStructure } from '@/domain/types/MovieReproductionStructure.js'
import type {CreateMovieInput} from '@/domain/types/CreateMovieInput.js'
export class Movie extends Show{

    private _urlMedia: string;
    private _urlHorizontalPoster: string;
    private _urlVerticalPoster: string;
    private _subtitles: string | null;

    constructor(inputCreateMovie: CreateMovieInput ) {
        const {
        categories,
        description, 
        id, 
        originalAlphIdFromOriginalSource, 
        originalNumIdFromOriginalSource, 
        title,
        urlMedia,
        urlHorizontalPoster,
        urlVerticalPoster,
        subtitles=null,

        } = inputCreateMovie;
        super(title, description, categories, id, originalNumIdFromOriginalSource, originalAlphIdFromOriginalSource);
        this._urlMedia = urlMedia.value;
        this._urlHorizontalPoster = urlHorizontalPoster.value;
        this._urlVerticalPoster = urlVerticalPoster.value;
        this._subtitles = subtitles;
    }

    get urlMedia(): string {
        return this._urlMedia;
    }

    set urlMedia(value: string) {
        this._urlMedia = Show.requireNonEmptyString(value, 'urlMedia');
    }

    get urlHorizontalPoster(): string {
        return this._urlHorizontalPoster;
    }

    set urlHorizontalPoster(value: string) {
        this._urlHorizontalPoster = Show.requireNonEmptyString(value, 'urlHorizontalPoster');
    }

    get urlVerticalPoster(): string {
        return this._urlVerticalPoster;
    }

    set urlVerticalPoster(value: string) {
        this._urlVerticalPoster = Show.requireNonEmptyString(value, 'urlVerticalPoster');
    }

    get subtitles(): string | null {
        return this._subtitles;
    }

    set subtitles(value: string | null) {
        this._subtitles = Movie.requireNullableString(value, 'subtitles');
    }

    getReproductionStrucuture(): MovieReproductionStructure {
        return {
            title : this.title,
            description : this.description,
            categories: this.categories,
            id: this.id,
            originalAlphIdFromOriginalSource: this.originalAlphIdFromOriginalSource,
            originalNumIdFromOriginalSource: this.originalNumIdFromOriginalSource,
            urlHorizontalPoster: this.urlHorizontalPoster,
            urlVerticalPoster: this.urlVerticalPoster,
            urlMedia: this.urlMedia,
            subtitles: this.subtitles
        };
    }

    private static requireNullableString(value: string | null, fieldName: string): string | null {
        if (value !== null && (typeof value !== 'string' || value.trim().length === 0)) {
            throw new Error(`The ${fieldName} must be a non-empty string or null.`);
        }

        return value;
    }
}