import { HomePage } from "../pageObjects/homePage";
import { LoginPage } from "../pageObjects/loginPage";
import { RegisterPage } from "../pageObjects/RegisterPage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.click();

      LoginPage.emailField.type("demo");
      LoginPage.passwordField.type("demo");
      LoginPage.loginButton.click();

      HomePage.accountButton.click();
      HomePage.userProfileButton.should("contain.text", "demo");
    });

    it("Registration", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.click();

      LoginPage.notYetCustomerButton.click();

      const email = `email_${Math.floor(Math.random() * 10000)}@ebox.com`;
      const password = "randomPassword34950";

      RegisterPage.emailField.type(email);
      RegisterPage.passwordField.type(password);
      RegisterPage.repeatPasswordField.type(password);

      RegisterPage.securityQuestionMenu.click();
      RegisterPage.securityQuestionOptions.contains(
        "Name of your favorite pet?"
      ).click();

      RegisterPage.securityAnswerInput.type("Dog");
      RegisterPage.registerButton.click();

      LoginPage.emailField.type(email);
      LoginPage.passwordField.type(password);
      LoginPage.loginButton.click();

      HomePage.accountButton.click();
      HomePage.userProfileButton.should("contain.text", email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      HomePage.searchIcon.click();
      HomePage.searchInput.type("Lemon{enter}");

      HomePage.productCards.contains("Lemon Juice (500ml)").click();

      HomePage.productCardsMenu.should(
        "contain.text",
        "Sour but full of vitamins."
      );
    });

    it("Search 500ml and validate cards", () => {
      HomePage.searchIcon.click();
      HomePage.searchInput.type("500ml{enter}");

      HomePage.productCards.contains("Eggfruit Juice (500ml)").click();
      HomePage.productCardsMenu.should(
        "contain.text",
        "Now with even more exotic flavour."
      );
      HomePage.productMenuCloseButton.click();

      HomePage.productCards.contains("Lemon Juice (500ml)").click();
      HomePage.productCardsMenu.should(
        "contain.text",
        "Sour but full of vitamins."
      );
      HomePage.productMenuCloseButton.click();

      HomePage.productCards.contains("Strawberry Juice (500ml)").click();
      HomePage.productCardsMenu.should("contain.text", "Sweet & tasty!");
      HomePage.productMenuCloseButton.click();
    });

    it("Read a review", () => {
      HomePage.searchIcon.click();
      HomePage.searchInput.type("King{enter}");

      HomePage.productCards.contains("King of the Hill").click();

      HomePage.reviewExpandButton.click();

      HomePage.productCardsMenu.should(
        "contain.text",
        "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!"
      );
    });

    it("Add a review", () => {
      HomePage.searchIcon.click();
      HomePage.searchInput.type("Raspberry{enter}");

      HomePage.productCards.contains("Raspberry Juice (1000ml)").click();

      HomePage.reviewInput.type("Tastes like metal");
      HomePage.reviewSubmitButton.click();

      HomePage.reviewExpandButton.click();

      HomePage.productCardsMenu.should("contain.text", "Tastes like metal");
    });


    it("Validate product card amount", () => {
      HomePage.productCards.should("have.length", 12);

      HomePage.itemsPerPageMenu.click();
      HomePage.itemsPerPageMenuOptions.contains("24").click();

      HomePage.productCards.should("have.length", 24);

      HomePage.itemsPerPageMenu.click();
      HomePage.itemsPerPageMenuOptions.contains("36").click();

      HomePage.productCards.should("have.length", 35);
    });


    it("Buy Girlie T-shirt", () => {
      HomePage.searchIcon.click();
      HomePage.searchInput.type("Girlie{enter}");

      cy.get('mat-card')                      // select all mat-card elements
        .contains('Girlie')                   // find the one that has the text "Girlie"
        .closest('mat-card')                   // go up to the nearest mat-card
        .find('button[aria-label="Add to Basket"]') // find the button inside it
        .click();

      HomePage.yourBasketButton.click();

      BasketPage.checkoutButton.click();

      SelectAddressPage.addressCards.contains("United Fakedom").click();
      SelectAddressPage.continueButton.click();

      DeliveryMethodPage.deliveryOptions.first().click();
      DeliveryMethodPage.continueButton.click();

      PaymentOptionsPage.paymentOption.contains("5678").click();
      PaymentOptionsPage.paymentOptionRadiobutton.first().check({ force: true });
      PaymentOptionsPage.continueButton.click();

      OrderSummaryPage.checkoutButton.click();

      OrderCompletionPage.thankYouMessage.should(
        "contain.text",
        "Thank you for your purchase!"
      );
    });

    it("Add address", () => {
      HomePage.accountButton.click();
      HomePage.orderPaymentButton.click();
      HomePage.savedAddressesButton.click();

      SavedAddressesPage.newAddressButton.click();

      CreateAddressPage.inputCountry.type("Latvia");
      CreateAddressPage.inputName.type("Test User");
      CreateAddressPage.inputPhone.type("12345678");
      CreateAddressPage.inputCode.type("LV-1001");
      CreateAddressPage.inputAddress.type("Test Street 1");
      CreateAddressPage.inputCity.type("Riga");
      CreateAddressPage.inputState.type("Riga");

      CreateAddressPage.submitButton.click();

      SavedAddressesPage.confirmAddition.should("contain.text", "Test Street 1");
    });

    it("Add payment option", () => {
      HomePage.accountButton.click();
      HomePage.orderPaymentButton.click();
      HomePage.savedPaymentMethodButton.click();

      PaymentOptionsPage.addNewCardButton.click();

      PaymentOptionsPage.inputName.type("Test User");
      PaymentOptionsPage.inputCardNum.type("4111111111111111");

      PaymentOptionsPage.inputMonth.select("7");
      PaymentOptionsPage.inputYear.select("2090");

      PaymentOptionsPage.submitButton.click();

      PaymentOptionsPage.confirmAdditionCard.should("contain.text", "1111");
    });
  });
});