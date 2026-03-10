import { Expense } from "../entities/expense.entity";

// Tipo de respuesta standar para operaciónes de un gasto individual
export type ExpenseResponse = {
    // Codigo de estado HTTP de la operación
    statusCode: number
    // Mensaje descriptivo de la operación realizada
    message: string
    // Datos del gasto
    data: Expense | null
    // TimeStamp de cuando se realizó la operación
    timeStamp: string
}

// Tipo de respuesta para listados de gastos, incluye información de paginación y totales
export type ExpenseListResponse = {
    // Codigo de estado HTTP de la operación
    statusCode: number
    // mensaje descriptivo de la operación
    message: string
    // Arreglo de gastos
    data: Expense[]
    // Información de paginación y totales
    pagination: {
        // Total de registros disponibles
        total: number
        // Cantidad de registros retornados
        cound: number
        // Suma total de todos los montos
        totalAmount: number
    }
    // TimeStamp de cuando se realizó la operación
    timeStamp: string
}

// Tipo de respuesta para errores de validación
export type ValidationErrorResponse = {
    // Codigo de estado HTTP de la operación (400)
    statusCode: number
    // mensaje general del error
    message: string
    // Errores agrupados por campo
    errors: Record<string, string[]>
    // TImeStamp del error
    timestamp: string
}

// Tipo de respuesta para errores generales
export type ErrorResponse = {
    // Codigo de estado HTTP de la operación
    statusCode: number
    // mensaje descriptivo de la operación
    message: string
    // Detalles adicionales
    details?: string
    // TimeStamp del error
    timestamp: string
}