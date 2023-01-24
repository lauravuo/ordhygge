describe("Ordhygge", function () {
  const home = "http://localhost:3000/ordhygge/";

  it("app loads", function (browser) {
    browser.url(home).assert.textContains("h2", "Ordhygge").end();
  });
  it("language changes", function (browser) {
    browser
      .url(home)
      .assert.textContains("div", "advare")
      .assert.textContains("div", "varoittaa")
      .click("#menu-button")
      .waitForElementVisible("#menu-item-1")
      .click("#menu-item-1")
      .assert.textContains("div", "varna")
      .end();
  });
  it("quiz works", function (browser) {
    const correctAnswer = '//button[contains(.,"hävittää, rikkoa, tuhota")]';
    browser
      .url(home)
      .waitForElementVisible("#quiz-button")
      .click("#quiz-button")
      .waitForElementVisible("#Ø-button")
      .click("#Ø-button")
      .click("#start-button")
      .useXpath()
      .waitForElementVisible(correctAnswer)
      .click(correctAnswer)
      .useCss()
      .waitForElementVisible("svg[stroke='green']")
      .assert.textContains("div", "1/1 points")
      .click("#continue-button")
      .assert.textContains("h2", "Ordhygge")
      .end();
  });
});
