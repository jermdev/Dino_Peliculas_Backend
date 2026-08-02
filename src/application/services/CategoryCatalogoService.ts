import { type CreateCategoryCatalogo } from "@/domain/ports/CreateCategoryCatalogo.ts";
import { type CategoryCatalogoRepository } from "@/domain/ports/CategoryCatalogoRepository.ts";
import { CategoryCatalogo } from "@/domain/entities/CategoryCatalogo.ts";

export class CategoryCatalogoService implements CreateCategoryCatalogo {
    
    private catalgoIncialized: boolean = false;

    constructor(private readonly categoryCatalogoRepository: CategoryCatalogoRepository) {}

    async ascreateCategoryCatalogo(Categories: string[]): Promise<boolean> {
        const categoryCatalogo = CategoryCatalogo.getInstance();
        Categories.forEach((categoria) => categoryCatalogo.addCategory(categoria));
        await this.categoryCatalogoRepository.saveCategoryCatalogo(categoryCatalogo);
        return true;
    }

    private async initializeCatalogoIfNeeded(): Promise<void> {
        const categories = await this.categoryCatalogoRepository.getCategoryCatalogo();
        const categoryCatalogo = CategoryCatalogo.getInstance();
        categories.forEach((categoria) => categoryCatalogo.addCategory(categoria));
        this.catalgoIncialized = true;
    }

    async createCategory(categoria: string): Promise<boolean> {
        if (!this.catalgoIncialized) {
            await this.initializeCatalogoIfNeeded();
        }
        const categoryCatalogo = CategoryCatalogo.getInstance();
        categoryCatalogo.addCategory(categoria);
        await this.categoryCatalogoRepository.saveCategory(categoria);
        return true;
    }

    async getCategoryCatalogo(): Promise<readonly string[]> {
        if (!this.catalgoIncialized) {
            await this.initializeCatalogoIfNeeded();
        }
        const categoryCatalogo = CategoryCatalogo.getInstance().getCatalogoOfCategorys();
        return categoryCatalogo;
    }
}