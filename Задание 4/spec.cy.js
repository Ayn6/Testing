describe("template spec", () => {
    it('Поиск аниме по запросу', () => {
      cy.visit('https://jut.su/');

      cy.get('input[name="ystext"]').first().type('Магическая битва');
      cy.get('input[value="Найти"]').click();

      cy.contains('Магическая битва').should('be.visible');
  });

    it('Страницу аниме', () => {
      cy.visit('https://jut.su/');
      cy.get('input[name="ystext"]').first().type('One Piece{enter}');

      cy.url().should('include', '/oneepiece/');
      cy.get('h1').should('contain', 'Смотреть Ван Пис все серии');
  });

  it("Авторизация", () => {
    cy.visit("https://jut.su/");

    cy.get('.login_btn').click();

    cy.get('#login_input1').type("user");
    cy.get('#login_input2').type("password");

    cy.get('#login_submit').click();

    cy.get(".user-profile").should("contain", "Профиль пользователя");
  });

    it("Регестрация", () => {
    cy.visit("https://jut.su/register.html");

    cy.get('#name').type("user");
    cy.get('input[name="password1"]').type("password");
    cy.get('input[name="email"]').type("andrymama62@gmail.com");

    cy.get('input[name="question_answer"]').type("Наруто");

    cy.get('input[type="checkbox"]').check({force: true});
    cy.get('button[name="submit"]').click();

    cy.contains('Пользователь с таким именем или e-mail адресом уже зарегистрирован!').should('be.visible');
  });

  it("Воспроизведение видео", () => {
    cy.visit("https://jut.su/");

    cy.get('input[name="ystext"]').first().type("Магическая битва {enter}");
    cy.get(".short-btn").first().click({ force: true });

    cy.get(".pm_videojs").click();
    cy.get("video").should("have.prop", "paused", true);
  });
});
