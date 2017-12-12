//应用测试框架Mocha
//http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
//实例代码
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});