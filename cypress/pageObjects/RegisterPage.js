import { BasePage } from "./basePage";

export class RegisterPage extends BasePage {
    static get url() {
        return '/#/register';
    }

    static get emailField() {
        return cy.get('#emailControl');
    }

    static get passwordField() {
        return cy.get('#passwordControl');
    }

    static get repeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    static get securityQuestionMenu() {
        return cy.get('[name="securityQuestion"]');
    }

    static get securityQuestionOptions() {
        return cy.get('[role="option"]');
    }

    static get securityAnswerInput() {
        return cy.get('#securityAnswerControl');
    }

    static get registerButton() {
        return cy.get('#registerButton');
    }


}