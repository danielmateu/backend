import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Min } from "class-validator";

export class CreateExpenseDto {
    // Descripción clara del gasto
    //  - Requerido
    //  . Mínimo 3 caracteres
    //  . Máximo 255 caracteres

    @IsString({ message: 'La descripción deber ser un texto' })
    @IsNotEmpty({ message: 'La descripción es requerida' })
    @Length(3, 255, {
        message: 'No cumple la longitud requerida (3-255 caracteres)'
    })
    description: string

    // Cantidad gastada
    // -Requerida
    // -Debe ser un número positivo
    // -Mínimo 0.01

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Máximo 2 decimales permitidos' })
    @IsPositive({ message: 'La cantidad debe ser un número positivo, mayor a cero' })
    @Min(0.01, { message: 'La cantidad debe ser al menos 0.01' })
    amount: number

    // Categoría del gasto
    // -Requerido
    // -Mínimos 2 caracteres
    // -Maximo 50 caracteres

    @IsString({ message: 'La descripción deber ser un texto' })
    @IsNotEmpty({ message: 'La categoría es requerida' })
    @Length(2, 50, {
        message: 'La categoría no cumple la longitud requerida (2-50 caracteres)'
    })
    category: string

    // Fecha en la que se realizó el gasto
    // -Requerido
    // -Fecha Válida
    // -No puede ser una fecha futura
    @IsDateString({},
        { message: "La fecha debe estar en formato válido (2026-12-31 o 2024-12-31T10:30:00Z)" }
    )
    @IsNotEmpty({ message: 'La fecha es requerida' })
    date: string
}
