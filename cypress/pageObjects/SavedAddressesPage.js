import { BasePage } from "../pageObjects/basePage";

export class SavedAddressesPage extends BasePage {
    static get url() {
        return '/#/address/saved';
    }

    static get newAddressButton() {
        return cy.get('button[aria-label="Add a new address"]');
    }

    static get confirmAddition() {
        return cy.get('mat-cell');
    }

}
