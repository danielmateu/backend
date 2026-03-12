import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import type { ExpenseListResponse, ExpenseResponse } from './types/expense-response.type';
import { ExpenseInternalException, ExpenseNotFoundException, ExpensValidationException } from './exceptions/expense.exceptions';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  /**
 * Registra un nuevo gasto en el sistema.
 *
 * @param createExpenseDto - Datos del gasto a registrar
 * @returns Respuesta con el gasto creado
 *
 * @example
 * POST /expenses
 * Content-Type: application/json
 *
 * {
 *   "description": "Compra de materiales de oficina",
 *   "amount": 150.50,
 *   "category": "Oficina",
 *   "date": "2024-03-09"
 * }
 */

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseResponse> {
    // return this.expensesService.create(createExpenseDto);
    try {
      const expense = this.expensesService.create(createExpenseDto)

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Gasto creado correctamente',
        data: expense,
        timeStamp: new Date().toISOString()
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
 * Obtiene el listado de todos los gastos del sistema.
 * Los gastos se retornan ordenados por fecha (más recientes primero).
 *
 * @returns Respuesta con lista de gastos e información de paginación
 *
 * @example
 * GET /expenses
 * 
 * Response:
 * {
 *   "statusCode": 200,
 *   "message": "Gastos obtenidos exitosamente.",
 *   "data": [
 *     {
 *       "id": "EXP-1",
 *       "description": "Compra de materiales",
 *       "amount": 150.50,
 *       "category": "Oficina",
 *       "date": "2024-03-09T10:30:00Z",
 *       "createdAt": "2024-03-09T10:35:00Z",
 *       "updatedAt": "2024-03-09T10:35:00Z"
 *     }
 *   ],
 *   "pagination": {
 *     "total": 1,
 *     "count": 1,
 *     "totalAmount": 150.50
 *   },
 *   "timestamp": "2024-03-09T10:35:00Z"
 * }
 */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ExpenseListResponse {
    // return this.expensesService.findAll();
    try {
      const expenses = this.expensesService.findAll()
      const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

      return {
        statusCode: HttpStatus.OK,
        message: 'Gastos obtenidos correctamente',
        data: expenses,
        pagination: {
          total: expenses.length,
          count: expenses.length,
          totalAmount: Math.round(totalAmount * 100) / 100
        },
        timeStamp: new Date().toISOString()
      }

    } catch (error) {
      this.handleError(error)
    }
  }

  /**
 * Obtiene un gasto específico por su ID.
 *
 * @param id - ID del gasto a obtener
 * @returns Respuesta con el gasto encontrado
 *
 * @example
 * GET /expenses/EXP-1
 */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  /**
 * Actualiza un gasto existente.
 * Solo actualiza los campos que se envían en la solicitud.
 * Los campos omitidos no se modifican.
 *
 * @param id - ID del gasto a actualizar
 * @param updateExpenseDto - Datos a actualizar (todos opcionales)
 * @returns Respuesta con el gasto actualizado
 *
 * @example
 * PATCH /expenses/EXP-1
 * Content-Type: application/json
 *
 * {
 *   "description": "Compra actualizada",
 *   "amount": 200.00
 * }
 */
  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto
  ): Promise<ExpenseResponse> {
    // return this.expensesService.update(id, updateExpenseDto);
    try {
      const expense = this.expensesService.update(id, updateExpenseDto)

      return {
        statusCode: HttpStatus.OK,
        message: 'Gasto actualizado correctamente',
        data: expense,
        timeStamp: new Date().toISOString()
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
 * Elimina un gasto del sistema.
 *
 * @param id - ID del gasto a eliminar
 * @returns Respuesta confirmando la eliminación
 *
 * @example
 * DELETE /expenses/EXP-1
 */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string): ExpenseResponse {
    // return this.expensesService.remove(id);
    try {
      this.expensesService.remove(id)
      return {
        statusCode: HttpStatus.OK,
        message: 'Gasto eliminado correctamente',
        data: null,
        timeStamp: new Date().toISOString()
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
 * Maneja todos los errores lanzados en el controlador.
 * Convierte excepciones personalizadas a respuestas HTTP apropiadas.
 *
 * @param error - El error a manejar
 * @throws NotFoundException si el gasto no existe
 * @throws BadRequestException si hay error de validación
 * @throws InternalServerErrorException para errores internos
 */
  private handleError(error: any): never {
    if (error instanceof ExpenseNotFoundException) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    }

    if (error instanceof ExpensValidationException) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    }

    if (error instanceof ExpenseInternalException) {
      throw new InternalServerErrorException({
        statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    }

    // Error desconocido
    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error interno del servidor',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    })
  }
}
