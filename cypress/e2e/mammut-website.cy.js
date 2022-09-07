import locale from "../fixtures/locale.json"

describe('Mammut Website POC', () => {

  context('Testing translation on different locale', () =>{

    it('should load German translation if visited from Germany',() =>{
      cy.visit('/'+ locale.Germany)
      cy.get('.MainMenuIcon_wrapper__KOG5O').click()      
      cy.get('.fs-nav-link-clothing').should('have.text','Bekleidung') 
    })

    it('should load French translation if visited from France',() =>{
      cy.visit('/'+ locale.France)
      cy.clickNav() //custom command
      cy.get('.fs-nav-link-clothing').should('have.text','Vêtements') 
    })

    it('should load English translation if visited from the Netherlands',() =>{
      cy.visit('/'+ locale.Netherlands)
      cy.clickNav()
      cy.get('.fs-nav-link-clothing').should('have.text','Clothing') 
    })

    it('should load German translation if visited from Switzerland(DE)',() =>{
      cy.visit('/'+ locale["Switzerland(DE)"])
      cy.clickNav()
      cy.get('.fs-nav-link-clothing').should('have.text','Bekleidung')
    })

  })

  context("Testing the login form flow & invalid case", ()=>{

    beforeEach(()=>{
      cy.visit('/')
    })

    it('should login to the account on valid credentials',()=>{
      const email = "kusumgole67+"+Math.floor(Math.random() * 1000)+"@gmail.com",
            password = "kusumgole";
      cy.signUp(email, password)
      cy.visit('/')
      cy.get('.fs-account-button').click()
      cy.get('#emailAddress').type(email)
      cy.get('#password').type(password)
      cy.get('#btn-login').click()
      cy.url().should('eq','https://www.mammut.com/eu/en/account/overview')
    })

    it('should show validation alert on invalid credentials',()=>{
      cy.get('.fs-account-button').click()
      cy.get('#emailAddress').type('kusumgole67@gmail.com')
      cy.get('#password').type('kusum')
      cy.get('#btn-login').click()
      cy.get('#error-message').contains('Wrong email or password')
    })

  })

  context('Validating the UI with CSS and class', ()=>{

    it('Out-of-stock product should have grey background color', ()=>{
      cy.visit('/products/1010-29510-00674/stoney-hs-jacket-men')
      cy.on('uncaught:exception', (e, runnable)=>{
        console.log('error is', e)
        console.log('runnable', runnable)
        if(e.message.includes("Unexpected token '<'")){
          return false
        }
      })
      cy.get('.PDPIntroControlsList_outOfStock__vlg1c').should('have.css','background-color', 'rgb(240, 240, 240)')
    })
  
    it('Product added to the wishlist should have active bookmark icon class',()=>{
      cy.visit('/category/5819-10/jackets-and-vests')
      cy.on('uncaught:exception', (e, runnable)=>{
        console.log('error is', e)
        console.log('runnable', runnable)
        return false
      })
      cy.get(':nth-child(1) > .ProductCardInfo_infoWrapper__SGFdX > .ProductCardInfo_info__LNE2N > .ProductCardInfo_inner__98oqx > .ProductCardInfo_bookmarkButtonPosition__Re7I7 > .BookmarkButton_container__TKyRx > .BookmarkIcon_container__m4xE3').click().then(($el)=>{
        expect($el).to.have.class('BookmarkIcon_isActive__hzdH6')
      })
    })
  
  })
  

  context('Testing add-to-cart from API and UI', ()=>{

    it('API testing - should add product to the cart',()=>{
      cy.request({
          url: 'https://checkout.mammut.com/carts/de/de/items',
          method: 'POST',
          body:{
              "sku": "1010-29510-3733-113",
              "quantity": 1,
              "cartId": "852390dc-1cfa-47d3-979d-f34214081421"
                }
        }).then((resp) => {
          expect(resp.status).to.eq(200)
          expect(resp.body.items[0].name).to.eq('Stoney HS Jacket Men')
          expect(resp.body.total_quantity).to.eq(1)
        })
    })

    it('UI - should add product to the cart',()=>{
      cy.visit('eu/en/products/1010-29510-3733/stoney-hs-jacket-men')
      cy.on('uncaught:exception', (e, runnable)=>{
        console.log('error is', e)
        console.log('runnable', runnable)
          return false
      })
      cy.get('.PDPIntroControls_buttons__CPTLV').click()
      cy.get('#1010-29510-S-0').click()
      cy.get ('.PDPForm_cta__KtyJf button[type="submit"]').click()
      cy.get('.PDPAddedToCart_btn__pOw1M').click({force: true})
      cy.get('.MenuRight_counter___kl49').should('contain', 1)
      cy.get('.BagItem_itemName__M_BrN').should('contain','Stoney HS Jacket Men')
    })

  })

  context('Testing the hamburger nav UI on different screen sizes',()=>{

    it('hamburger navigation on desktop',() =>{
      cy.viewport(1920,1080)
      cy.visit ('/')
      cy.get('.MainMenuIcon_wrapper__KOG5O').click()
      cy.get('.MenuBarMain_navigationLinks__6fT9v > :nth-child(1) > .IconLink_container__Wid7C > .IconLink_label__VcJri').click()
      cy.get('.MenuBarCategories_mainFilters__8K7MR > :nth-child(2) > .IconLink_container__Wid7C > .IconLink_label__VcJri').click()
      cy.get('.MenuBarProducts_container__KH8XW > :nth-child(2) > .Link_container__hIi2K').should('contain','Jackets & Vests')
    })

    it('hamburger navigation on mobile',() =>{
      cy.viewport (375,712)
      cy.visit('/')
      cy.get('.CloseIcon_container__8jCPd > path').click()
      cy.get('.MenuBarMain_navigationLinks__6fT9v > :nth-child(1) > .IconLink_container__Wid7C > .IconLink_label__VcJri').click()
      cy.get('.MenuBarCategories_mainFilters__8K7MR > :nth-child(2) > .IconLink_container__Wid7C > .IconLink_label__VcJri').click()
      cy.get('.MenuBarProducts_container__KH8XW > :nth-child(2) > .Link_container__hIi2K').should('contain','Jackets & Vests')
    })

  })


  context.skip('Visual testing Mammut landing page',() => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'Mammut website',                       
            testName: Cypress.currentTest.title,        
        })
    })

    it('should land on the Mammut website', () => {
        cy.visit('/')
        cy.eyesCheckWindow({
            tag: "Mammut Online Shop",
            target: 'window',
            fully: true
        });
    })
  
    afterEach(() => {
      cy.eyesClose()
    })
  })
  
})







