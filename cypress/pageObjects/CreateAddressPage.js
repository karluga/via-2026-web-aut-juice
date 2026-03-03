import { BasePage } from "../pageObjects/basePage";

export class CreateAddressPage extends BasePage {
    static get url() {
        return '/#/address/create';
    }

    static get inputCountry() {
        return cy.get('input[placeholder="Please provide a country."]');
    }

    static get inputName() {
        return cy.get('input[placeholder="Please provide a name."]');
    }

    static get inputPhone() {
        return cy.get('input[placeholder="Please provide a mobile number."]');
    }

    static get inputCode() {
        return cy.get('input[placeholder="Please provide a ZIP code."]');
    }

    static get inputAddress() {
        return cy.get('textarea#address');
    }

    static get inputCity() {
        return cy.get('input[placeholder="Please provide a city."]');
    }

    static get inputState() {
        return cy.get('input[placeholder="Please provide a state."]');
    }

    static get submitButton() {
        return cy.get('#submitButton');
    }
}