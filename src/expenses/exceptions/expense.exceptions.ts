// Excepción lanzada cuando un gasto no es encontrado, se usa cuando se intenta acceder a un gasto que no existe

export class ExpenseNotFoundException extends Error {
    constructor(expenseId: string) {
        super(`El gasto ${expenseId} no ha sido encontrado`)
    }
}

// Excepción lanzada cuando hay un error de validación en los datos, contiene detalles especificos de qué campos fallaron la validación
export class ExpensValidationException extends Error {
    constructor(
        public errors: Record<string, string[]>
    ) {
        super('El gasto contiene datos inválidos')
        this.name = 'ExpenseValidationException'
    }
}

// Excepción lanzada cuando ocurre un error inesperado, para errores internos del servidor
export class ExpenseInternalException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ExpenseInternalException'
    }
}