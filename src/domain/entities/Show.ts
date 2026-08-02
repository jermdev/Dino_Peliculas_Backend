import type { ReproductionStructure } from '@/domain/types/ReproductionStructure.ts'

export abstract class Show {
    private _title: string;
    private _description: string;
    private _categories: string[];
    private _id: string;
    private _originalNumIdFromOriginalSource: number;
    private _originalAlphIdFromOriginalSource: string;

    constructor(
        title: string,
        description: string,
        categories: string[],
        id: string,
        originalNumIdFromOriginalSource: number,
        originalAlphIdFromOriginalSource: string,
    ) {
        this._title = title;
        this._description = description;
        this._categories = categories;
        this._id = id;
        this._originalNumIdFromOriginalSource = originalNumIdFromOriginalSource;
        this._originalAlphIdFromOriginalSource = originalAlphIdFromOriginalSource;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = Show.requireNonEmptyString(value, 'title');
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = Show.requireNonEmptyString(value, 'description');
    }

    get categories(): string[] {
        return this._categories;
    }

    set categories(value: string[]) {
        this._categories = Show.requireCategories(value);
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = Show.requireNonEmptyString(value, 'id');
    }

    get originalNumIdFromOriginalSource(): number {
        return this._originalNumIdFromOriginalSource;
    }

    set originalNumIdFromOriginalSource(value: number) {
        this._originalNumIdFromOriginalSource = Show.requireNumber(value, 'originalNumIdFromOriginalSource');
    }

    get originalAlphIdFromOriginalSource(): string {
        return this._originalAlphIdFromOriginalSource;
    }

    set originalAlphIdFromOriginalSource(value: string) {
        this._originalAlphIdFromOriginalSource = Show.requireNonEmptyString(value, 'originalAlphIdFromOriginalSource');
    }

    abstract getReproductionStrucuture(): ReproductionStructure;

    protected static requireNonEmptyString(value: string, fieldName: string): string {
        if (typeof value !== 'string' || value.trim().length === 0) {
            throw new Error(`The ${fieldName} must be a non-empty string.`);
        }

        return value;
    }

    protected static requireCategories(value: string[]): string[] {
        if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || item.trim().length === 0)) {
            throw new Error('categories must be a non-empty array of strings.');
        }

        return value;
    }

    protected static requireNumber(value: number, fieldName: string): number {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            throw new Error(`The ${fieldName} must be a valid number.`);
        }

        return value;
    }
}