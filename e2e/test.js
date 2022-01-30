describe("Ordhygge", function () {
  // test() and specify() is also available

  it("app loads", function (browser) {
    browser
      .url("http://localhost:3000/")
      .assert.containsText("h2", "Ordhygge")
      .end();
  });
});
