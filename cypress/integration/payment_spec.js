const { v4: uuidv4 } = require('uuid');

describe('payment', () => {
    it('user can make payment', () => {
        // login
        cy.visit('/');
        cy.findByRole('textbox', { name: /username/i }).type('johndoe');
        cy.findByLabelText(/password/i).type('s3cret');
        cy.findByRole('checkbox', { name: /remember me/i }).check();
        cy.findByRole('button', { name: /sign in/i }).click();

        // check account balance
        let oldBalance;
        let floatOldBalance;
        cy.get('[data-test="sidenav-user-balance"]').then($balance => { 
            oldBalance = $balance.text();
            floatOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
        });
       
        // click on $NEW button
        cy.findByRole('button', { name: /new/i }).click();

        // search for user
        cy.findByRole('textbox').type('devon becker');
        cy.findByText(/devon becker/i).click();

        // add amount and note and click pay
        const amount = '5.00';
        cy.findByPlaceholderText(/amount/i).type(amount);
        // expect(floatOldBalance).to.greaterThan(parseFloat(amount));    
        
        const note = uuidv4();
        cy.findByPlaceholderText(/add a note/i).type(note);
        cy.findByRole('button', { name: /pay/i }).click();

        // return to transactions
        cy.findByText(/return to transactions/i).click();

        // go to personal payment
        cy.findByRole('tab', { name: /mine/i }).click();

        // click on payment
        cy.findByText(note).click({ force: true });

        // verify if payment was made
        cy.findByText(`-$${amount}`).should('be.visible');
        cy.findByText(note).should('be.visible');

        // verify if payment amount was deducted
        cy.get('[data-test="sidenav-user-balance"]').then($balance => {
            const floatNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
            // expect(floatOldBalance - floatNewBalance).to.equal(parseFloat(amount));
        });

    });

});