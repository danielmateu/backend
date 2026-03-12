import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseInternalException, ExpenseNotFoundException, ExpensValidationException } from './exceptions/expense.exceptions';

@Injectable()
export class ExpensesService {

  // Almacenamos en memoria los gastos usando Map
  private expenses = new Map<string, Expense>()

  // Contador para generar IDs únicos y secuenciales
  private idCounter = 1

  // Crea un nuevo gasto en el sistema
  create(createExpenseDto: CreateExpenseDto): Expense {
    // return 'This action adds a new expense';
    try {

      if (!createExpenseDto.description?.trim()) {
        throw new ExpensValidationException({ description: ['La descripción es obligatoria'] })
      }

      if (createExpenseDto.amount <= 0) {
        throw new ExpensValidationException({ amount: ['El monto debe ser mayor que 0'] })
      }

      const parsedDate = new Date(createExpenseDto.date)
      if (Number.isNaN(parsedDate.getTime())) {
        throw new ExpensValidationException({ date: ['La fecha no es válida'] })
      }

      const id = this.generateId()
      const now = new Date()

      const expense: Expense = {
        id,
        description: createExpenseDto.description,
        amount: createExpenseDto.amount,
        category: createExpenseDto.category,
        date: new Date(createExpenseDto.date),
        createdAt: now,
        updatedAt: now
      }

      this.expenses.set(id, expense)
      return expense
    } catch (error) {
      throw new ExpenseInternalException(`
          Error al crear el gasto: ${error instanceof Error ? error.message : 'Error desconocido'}
        `)
    }
  }

  findAll(): Expense[] {
    // return `This action returns all expenses`;
    try {
      return Array.from(this.expenses.values()).sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      )
    } catch (error) {
      throw new ExpenseInternalException(
        `Error al obtener los gastos; ${error instanceof Error ? error.message : 'Error desconocido'}`
      )

    }
  }

  findOne(id: string): Expense {
    // return `This action returns a #${id} expense`;
    try {
      const expense = this.expenses.get(id)
      if (!expense) {
        throw new ExpenseNotFoundException(id)
      }
      return expense
    } catch (error) {
      if (error instanceof ExpenseNotFoundException) {
        throw error
      }

      throw new ExpenseInternalException(
        `Error al encontrar el gasto; ${error instanceof Error ? error.message : 'Error desconocido'}`
      )
    }
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto): Expense {
    // return `This action updates a #${id} expense`;
    try {
      const expense = this.findOne(id)

      if (updateExpenseDto.description !== undefined && !updateExpenseDto.description.trim()) {
        throw new ExpensValidationException({ description: ['La descripción no puede estar vacía'] })
      }

      if (updateExpenseDto.amount !== undefined && updateExpenseDto.amount <= 0) {
        throw new ExpensValidationException({ amount: ['El monto debe ser mayor que 0'] })
      }

      if (updateExpenseDto.description !== undefined) {
        expense.description = updateExpenseDto.description
      }
      if (updateExpenseDto.amount !== undefined) {
        expense.amount = updateExpenseDto.amount
      }
      if (updateExpenseDto.category !== undefined) {
        expense.category = updateExpenseDto.category
      }
      if (updateExpenseDto.date !== undefined) {
        expense.date = new Date(updateExpenseDto.date)
      }

      // Actualizamos timeStamp de mod
      expense.updatedAt = new Date()

      this.expenses.set(id, expense)
      return expense

    } catch (error) {
      if (error instanceof ExpenseNotFoundException) {
        throw error
      }

      throw new ExpenseInternalException(
        `Error al actualizar el gasto: ${error instanceof Error ? error.message : 'Error desconocido'}`
      )
    }
  }

  remove(id: string): void {
    // return `This action removes a #${id} expense`;
    try {

      const expense = this.findOne(id)
      if (!expense) {
        throw new ExpenseNotFoundException(id)
      }

      this.expenses.delete(id)
      // console.log(`Gasto con ID ${id} eliminado correctamente`)
    } catch (error) {
      if (error instanceof ExpenseInternalException) {
        `Error al eliminar el gasto: ${error instanceof Error ? error.message : 'Error desconocido'}`
      }
    }
  }

  // Genera un ID único para un gasto
  private generateId(): string {
    return `EXP-${this.idCounter++}`
  }
}
