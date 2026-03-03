import { BasePage } from "../pageObjects/basePage";

export class DeliveryMethodPage extends BasePage {
    static get url() {
        return '/#/delivery';
    }

    static get deliveryOptions() {
        return cy.get('mat-row[role="row"]');
    }

    static get continueButton() {
        return cy.get('button[aria-label="Proceed to delivery method selection"]');
    }

}
