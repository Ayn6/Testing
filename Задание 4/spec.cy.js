describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://jut.su/");
    cy.intercept("POST", "https://events.backtrace.io/**", {
      statusCode: 200,
    }).as("backtrace");
  });

  it('cy.title() - get the title', () => {

    cy.title().should('include', 'Школа техник Наруто: стань Хокаге!')
  });

  it('cy.url() - get the current URL', () => {

    cy.url().should('eq', 'https://jut.su/')
  })

    it('Поиск аниме по запросу', () => {

      cy.get('input[name="ystext"]').first().type('Магическая битва');
      cy.get('input[value="Найти"]').click();

      cy.contains('Магическая битва').should('be.visible');
  });

  it('.as() - alias a DOM element for later use', () => {
    cy.visit('https://jut.su/anime/');

    cy.get('.all_anime_content')
      .find('.all_anime_global')
      .first()
      .find('a')
      .first()
      .as('firstAnime')

    cy.get('@firstAnime').click({ multiple: true })

    cy.url().should('eq', 'https://jut.su/shingekii-no-kyojin/')
  })

  it('.add() - create a custom command', () => {
    Cypress.Commands.add('console', {
      prevSubject: true,
    }, (subject, method) => {
    // the previous subject is automatically received
    // and the commands arguments are shifted

      // allow us to change the console method used
      method = method || 'log'

      // log the subject to the console
      console[method]('The subject is', subject)

      // whatever we return becomes the new subject
      // we don't want to change the subject so
      // we return whatever was passed in
      return subject
    })

    cy.get('a').console('info').then(($a) => {
    // subject is still $button
    })
  })

  it('Страница аниме', () => {

    cy.get('input[name="ystext"]').first().type('One Piece{enter}');

    cy.url().should('include', '/oneepiece/');
    cy.get('h1').should('contain', 'Смотреть Ван Пис все серии');
  });

  it("Авторизация", () => {
    cy.visit("https://jut.su/");

    cy.get(".login_btn").click();

    cy.get("#login_input1").type("user");
    cy.get("#login_input2").type("password");

    cy.get("#login_submit").click();

    cy.get(".user-profile").should("contain", "Профиль пользователя");
  });

  it("Регестрация", () => {
    cy.visit("https://jut.su/register.html");

    cy.get("#name").type("user");
    cy.get('input[name="password1"]').type("password");
    cy.get('input[name="email"]').type("andrymama62@gmail.com");

    cy.get('input[name="question_answer"]').type("Наруто");

    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('button[name="submit"]').click();

    cy.contains(
      "Ошибка регистрации"
    ).should("be.visible");
  });

  it("Воспроизведение видео", () => {

  cy.get('input[name="ystext"]').first().type("Магическая битва {enter}");
  cy.get(".short-btn").first().click({ force: true });

  cy.get(".pm_videojs").click();
  cy.get("video").should("have.prop", "paused", true);
  });
});
