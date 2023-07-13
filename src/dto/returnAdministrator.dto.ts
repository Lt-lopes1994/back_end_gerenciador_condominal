export interface ReturnAdministratorDto {
    id?: string;
    cnpj: number;
    contactPerson: string;
    email: string;
    ie: number;
    phone: number;
    whatsApp?: number;
    website?: string;
    activebit?: boolean;
}