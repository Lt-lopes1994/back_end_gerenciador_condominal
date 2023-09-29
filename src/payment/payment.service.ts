import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-08-16'
        });
    }

    async createInvoice(id: string) {
        const invoice = await this.stripe.invoices.create({
            customer: id,
            collection_method: 'send_invoice',
            days_until_due: 7
        });

        await this.stripe.invoiceItems.create({
            customer: invoice.customer,
            price: 'price_1NvkcNHQzMegkZilTy5TjjCv',
            invoice: invoice.id
        });

        await this.stripe.invoices.finalizeInvoice(invoice.id);

        const sendInvoice = await this.stripe.invoices.sendInvoice(invoice.id);

        return sendInvoice
    }

    async getUser(email: string) {
        const user = await this.stripe.customers.search({
            query: `email: '${email}'`
        })

        return user;
    }
}
