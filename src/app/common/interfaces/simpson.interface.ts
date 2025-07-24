export interface SimpsonRequest {
  docs: Simpson[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: any;
  totalDocs: number;
  totalPages: number;
}

export interface Simpson {
  Estado: string;
  Genero: string;
  Historia: string;
  Imagen: string;
  Nombre: string;
  Ocupacion: string;
  updatedAt: string;
  _id: string;
}
