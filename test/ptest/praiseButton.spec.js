import PraiseButton from '../src/js/praiseButton.js';

describe('测试点赞+1', function () {
  it('add 函数', function () {
    var testPraiseButton = new PraiseButton();
    testPraiseButton.add();

    expect(testPraiseButton.count).toBe(1);
  });
});