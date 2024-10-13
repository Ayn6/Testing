describe('template spec', () => { 
 
  describe('template spec', () => { 
    beforeEach(() => { 
      cy.visit('https://www.saucedemo.com') 
    }) 
    it('Log', () => { 
      cy.get('#user-name').type('standard_user'); 
      cy.get('#password').type('secret_sauce'); 
      cy.get('#login-button').click(); 
    }); 
   
    it('ErrorLog', () => { 
      cy.get('#user-name').type('admin'); 
      cy.get('#password').type('admin'); 
      cy.get('#login-button').click(); 
    }); 
 
    it('Filter des', () => { 
 
      let lastPrice = 0.0; 
      cy.get('#user-name').type('standard_user'); 
      cy.get('#password').type('secret_sauce'); 
      cy.get('#login-button').click(); 
 
      cy.get('.product_sort_container').children('option').should('have.length', 4).eq(2).should('have.value', 'lohi'); 
 
      cy.get('.product_sort_container').select('lohi'); 
 
      cy.get('.inventory_item[data-test="inventory-item"]') 
      .each((el) => { 
          const priceTx = el.find('.inventory_item_price[data-test="inventory-item-price"]').text(); 
          const price = parseFloat(priceTx.replace('$', '')); 
 
          cy.log(`Price: ${price}`); 
          cy.log(`Last Price: ${lastPrice}`); 
 
          if(price < lastPrice) { 
 
            expect(price).to.be.greaterThan(lastPrice) 
 
          } 
 
          lastPrice = price; 
      }); 
    }); 
 
    it('Filter asb', () => { 
 
      let lastPrice = 100.0; 
      cy.get('#user-name').type('standard_user'); 
      cy.get('#password').type('secret_sauce'); 
      cy.get('#login-button').click(); 
 
      cy.get('.product_sort_container').children('option').should('have.length', 4).eq(3).should('have.value', 'hilo'); 
 
      cy.get('.product_sort_container').select('hilo'); 
 
      cy.get('.inventory_item[data-test="inventory-item"]') 
      .each((el) => { 
          const priceTx = el.find('.inventory_item_price[data-test="inventory-item-price"]').text(); 
          const price = parseFloat(priceTx.replace('$', '')); 
 
          cy.log(`Price: ${price}`); 
          cy.log(`Last Price: ${lastPrice}`); 
 
          if(price > lastPrice) { 
 
            expect(price).to.be.greaterThan(lastPrice) 
 
          } 
 
          lastPrice = price; 
      }); 
    }); 
 
    it('Add to bag', () => { 
      cy.get('#user-name').type('standard_user'); 
      cy.get('#password').type('secret_sauce'); 
      cy.get('#login-button').click(); 
 
      cy.get('#add-to-cart-sauce-labs-backpack').click(); 
      cy.get('#add-to-cart-sauce-labs-bike-light').click(); 
      cy.get('.shopping_cart_link').click(); 
 
    }); 
 
    it('Order', () => { 
      cy.get('#user-name').type('standard_user'); 
      cy.get('#password').type('secret_sauce'); 
      cy.get('#login-button').click(); 
 
      cy.get('#add-to-cart-sauce-labs-backpack').click(); 
      cy.get('#add-to-cart-sauce-labs-bike-light').click(); 
      cy.get('.shopping_cart_link').click(); 
      cy.get('#checkout').click(); 
   
      cy.get('#first-name').type('Abba'); 
      cy.get('#last-name').type('FFFFFF'); 
      cy.get('#postal-code').type('4'); 
      cy.get('#continue').click(); 
      cy.get('#finish').click(); 
 
    }); 
 
  }) 
   
})