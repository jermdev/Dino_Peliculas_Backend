export class CategoryCatalogo {
    private catalogoOfCategorys: string[];
    private static instanceOfCategoryCatalogo: CategoryCatalogo;

    private constructor(categorias: string[] = []) {
        this.catalogoOfCategorys = categorias;
    }

    public addCategory(categoria: string): boolean {
        let addedFlag: boolean = false;
        if (!this.existsCategory(categoria)) {
            this.catalogoOfCategorys.push(categoria);
            addedFlag = true;
        }
        return addedFlag;
    }

    public getCatalogoOfCategorys(): readonly string[] {
        return [...this.catalogoOfCategorys];
    }

    public removeCategory(categoria: string): boolean {
        let removedFlag: boolean = false;
        const index = this.catalogoOfCategorys.indexOf(categoria);
        if (index !== -1) {
            this.catalogoOfCategorys.splice(index, 1);
            removedFlag = true;
        }
        return removedFlag;
    }

    public existsCategory(categoria: string): boolean {
        return this.catalogoOfCategorys.includes(categoria);
    }

    public static getInstance(): CategoryCatalogo {
        if (!this.instanceOfCategoryCatalogo) {
            this.instanceOfCategoryCatalogo = new CategoryCatalogo();
        }
        return this.instanceOfCategoryCatalogo;
    }
}   