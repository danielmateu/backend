import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import type { ExpenseListResponse, ExpenseResponse } from './types/expense-response.type';
import { ExpenseInternalException, ExpenseNotFoundException } from './exceptions/expense.exceptions';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }

  private handleError(error: any): never {
    if (error instanceof ExpenseNotFoundException) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
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

    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error interno del servidor',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    })
  }
}
