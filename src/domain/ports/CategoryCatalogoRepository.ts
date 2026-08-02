import { CategoryCatalogo } from "@/domain/entities/CategoryCatalogo.ts";

export interface CategoryCatalogoRepository {
    saveCategoryCatalogo(categoryCatalogo: CategoryCatalogo): Promise<void>
    saveCategory(categoria: string): Promise<void>
    getCategoryCatalogo(): Promise<readonly string[]>
}