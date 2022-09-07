Cypress.Commands.add('clickNav',()=>{
    cy.get('.MainMenuIcon_wrapper__KOG5O').click()      
})

Cypress.Commands.add('signUp', (emailId,password)=>{
    cy.request({
        method:'POST',
        url:'https://login.mammut.com/dbconnections/signup',
        body: {
            email: emailId,
            password: password,
            connection: "MammutDB"
        }
    })
})