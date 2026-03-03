import { BasePage } from "../pageObjects/basePage";

export class OrderCompletionPage extends BasePage {
    static get url() {
        return '/#/order-completion';
    }

    static get thankYouMessage() {
        return cy.get('div.order-completion-header');
    }
}