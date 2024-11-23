describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://jut.su/");
    cy.intercept("POST", "https://events.backtrace.io/**", {
      statusCode: 200,
    }).as("backtrace");
  });

  it('Проверка заголовка страницы', () => {

    cy.title().should('include', 'Школа техник Наруто: стань Хокаге!')

  });

  it('Проверка url страницы', () => {

    cy.url().should('eq', 'https://jut.su/')

  })

  it('Поиск аниме по запросу', () => {

    let nameAnime = 'Магическая битва';

    cy.get('input[name="ystext"]').first().type(nameAnime);
    cy.get('input[value="Найти"]').click();

    cy.contains(nameAnime).should('be.visible');

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

  it('Получение всех ссылок на странице', () => {

    Cypress.Commands.add('console', {
      prevSubject: true,
    }, (subject, method) => {

      method = method || 'log'
      console[method]('The subject is', subject)

      return subject
    })

    cy.get('a').console('info').then(($a) => {

      $a.each((index, el) => {
        const $link = Cypress.$(el)
        if ($link.hasClass('yrw-url')) {
          console.log(`Ссылка с индексом ${index} имеет класс 'yrw-url'`)
        } else {
          console.log(`Ссылка с индексом ${index} не имеет класса 'yrw-url'`)
        }
      })

    })

  })

  it('Проверка открытия стираницы аниме', () => {

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

  it("Не валидная регистрация", () => {
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
