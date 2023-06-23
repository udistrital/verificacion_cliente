export class TipoDocumento {
    Activo: boolean;
    CodigoAbreviacion: string;
    Descripcion: string;
    Extension: string;
    Id: number;
    Nombre: string;
    NumeroOrden: number;
    Tamano: number;
    Workspace: string;
    TipoDocumentoNuxeo: string;
}

export class Documento {
    Descripcion: string;
    Enlace: string;
    Id: number;
    Metadatos: string;
    Nombre: string;
    TipoDocumento: TipoDocumento;
}
