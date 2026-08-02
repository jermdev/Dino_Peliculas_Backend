export class HttpPath {
    public readonly value: string;

    constructor(value: string) {
        this.value = HttpPath.validate(value);
    }

    public static isValid(value: string): boolean {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return false;
        }

        const trimmed = value.trim();
        const pathRegex = /^\/[A-Za-z0-9\-._~!$&'()*+,;=:@\/\%]*(?:\?[A-Za-z0-9\-._~!$&'()*+,;=:@\/\%]*)?(?:#[A-Za-z0-9\-._~!$&'()*+,;=:@\/\%]*)?$/;
        return pathRegex.test(trimmed);
    }

    private static validate(value: string): string {
        if (!HttpPath.isValid(value)) {
            throw new Error(`Invalid HTTP path: ${value}`);
        }

        return value.trim();
    }

    public toString(): string {
        return this.value;
    }
}
