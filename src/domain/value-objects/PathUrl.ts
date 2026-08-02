export class PathUrl {
    public readonly value: string;

    constructor(value: string) {
        this.value = PathUrl.validate(value);
    }

    public static isValid(value: string): boolean {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return false;
        }

        const trimmed = value.trim();
        return PathUrl.isHttpUrl(trimmed) || PathUrl.isPath(trimmed);
    }

    private static isHttpUrl(value: string): boolean {
        try {
            const url = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    private static isPath(value: string): boolean {
        const pathRegex = /^\/[A-Za-z0-9\-._~!$&'()*+,;=:@\/%]*(?:\?[A-Za-z0-9\-._~!$&'()*+,;=:@\/%]*)?(?:#[A-Za-z0-9\-._~!$&'()*+,;=:@\/%]*)?$/;
        return pathRegex.test(value);
    }

    private static validate(value: string): string {
        if (!PathUrl.isValid(value)) {
            throw new Error(`Invalid path URL: ${value}`);
        }

        return value.trim();
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: PathUrl): boolean {
        return this.value === other.value;
    }
}
