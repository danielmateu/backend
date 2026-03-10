import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsISO8601, IsNumber, IsOptional, IsPositive, IsString, Length, Min } from 'class-validator';

// DTO para la actualización parcial de un gasto, todos los campos son opcionales, cumplen las mismas validaciones que CreateExpense
export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {

    @IsOptional()
    @IsString({ message: 'La descripción deber ser un texto' })
    @Length(3, 255, {
        message: 'La descripción debe tener entre 3 y 255 caracteres'
    })
    description?: string

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 },
        { message: 'Máximo dos decimales' }
    )
    @IsPositive({ message: 'La cantidad debe ser un número superior a cero' })
    @Min(0.01, { message: 'La cantidad debe ser al menos 0.01' })
    amount?: number

    @IsOptional()
    @IsString({ message: 'La categoria deber ser un texto' })
    @Length(2, 50, {
        message: 'La categoría debe tener entre 2 y 50 caracteres'
    })
    category?: string

    @IsOptional()
    @IsISO8601({ strict: true },
        { message: "La fecha debe estar en formato ISO válido (2026-12-31T10:30:00z)" }
    )
    date?: string
}
