// Entidad que representaun gasto en el sistema
// Contiene toda la información relevante sobre una operación de gasto

export class Expense {
    // Identificador del gasto
    id: string

    // Descripción del gasto => Pizza para 2
    description: string

    // Cantidad de dinero gastado
    amount: number

    // Categoria a la que pertenece el gasto (Oficina, Servicios, etc...)
    category: string

    date: Date

    // Fecha en la que el gasto se ha creado
    // createdAt: Date

    // Fecha en la que el gasto se actualizó
    updatedAt: Date
}
