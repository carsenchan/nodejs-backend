const { current } = require("../../config/time.config");

describe("Dummy timestamp", () => {
  it("its year should be 2017", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getFullYear()).toEqual(2019);
  });
  it("its month should be 07", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getMonth()).toEqual(7 - 1);
  });
  it("its date should be 26", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getDate()).toEqual(26);
  });

  it("its hour should be current hour", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getHours()).toEqual(new Date().getHours());
  });

  it("its minute should be current minute", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getMinutes()).toEqual(new Date().getMinutes());
  });

  it("its second should be current second", () => {
    const currentTimeStamp = current();
    expect(currentTimeStamp.getSeconds()).toEqual(new Date().getSeconds());
  });
});
