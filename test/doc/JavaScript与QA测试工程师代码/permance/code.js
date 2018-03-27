var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
suite.add('使用正则匹配字符串', function() {
    /o/.test('Hello World!');
  })
  .add('使用字符串查找', function() {
    'Hello World!'.indexOf('o') > -1;
  })
  //添加监听
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  //执行结果
  .on('complete', function() {
    console.log('更快的是-》 ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });