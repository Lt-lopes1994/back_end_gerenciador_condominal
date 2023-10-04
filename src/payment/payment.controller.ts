import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createInvoice(@Param('id') id: string) {
    try {
      const token = await this.usersService.findOneId(id);
      const user = await this.paymentService.getUser(token.email);

      return this.paymentService.createInvoice(user.data[0].id);
    } catch (error) {
      return error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('listar-boletos/:id')
  async listAllInvoices(@Param('id') id: string) {
    try {
      const token = await this.usersService.findOneId(id);
      const user = await this.paymentService.getUser(token.email);

      return this.paymentService.getAllInvoices(user.data[0].id);
    } catch (error) {
      return error
    }
  }
}
