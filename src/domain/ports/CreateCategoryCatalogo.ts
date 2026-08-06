import { CategoryCatalogo } from "@/domain/entities/CategoryCatalogo.js";

export interface CreateCategoryCatalogo {
    ascreateCategoryCatalogo(Categories: string[]): Promise<boolean>
    createCategory(categoria: string): Promise<boolean>
    getCategoryCatalogo(): Promise<readonly string[]>
}