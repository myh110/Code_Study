var express = require('express');
var app = express();
var axios = require("axios");
var fs = require("fs");
var path = require("path");
var rootPath = path.resolve(__dirname)
console.log(rootPath)
var instance = axios.create({
  baseURL: '',
  // timeout: 1000,
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': 'csrftoken=BjxrHcwJiQE4Q5Bx1gtHtSz5BEQvHlHx; ajs_group_id=null; ajs_anonymous_id=%2292149fc9-3a07-45b5-b8ce-e927828a193c%22; UM_distinctid=1638803cfe037a-0e6280b510aa33-336e7704-13c680-1638803cfe1b36; ajs_user_id=%228548909%22; gr_user_id=6c3f7b4d-86ec-4fca-bf15-79aee4e2769f; user_id=8548909; frontendUserTrackPrev=48146; sequence=6; sessionid=d70d979d01a2551a274653f3c6974435; _log_user_id=485f501011f3cfba7af7401490ccbaf0; _spoc_lms_cms_sessionid=d70d979d01a2551a274653f3c6974435; frontendUserTrack=48148; frontendUserReferrer=http://newhebtu.xuetangx.com/?iframe=http%3A%2F%2Fnewhebtu.xuetangx.com%2Faccounts%2Flogin%3Fnext%3D%2Fcourses%2Fcourse-v1%253Ahebtu%252Bshxi01%252B2018_1%2Fdiscussion%2Fforum%2F9e3d6406fb204d649e1d204bdae1c0fa%2Fthreads%2F5aa08480459f0828dc000395#/; CNZZDATA1273255756=1097324598-1526995341-%7C1535015072',
    'Host': 'newhebtu.xuetangx.com',
    'Pragma': 'no-cache',
    'Referer': 'http://newhebtu.xuetangx.com/courses/course-v1:hebtu+shxi01+2018_1/discussion/forum/9e3d6406fb204d649e1d204bdae1c0fa/threads/5aa08480459f0828dc000395',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    'X-CSRFToken': 'BjxrHcwJiQE4Q5Bx1gtHtSz5BEQvHlHx',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
app.get('/', function (req, res) {


  instance.get(
    'http://newhebtu.xuetangx.com/courses/course-v1:hebtu+shxi01+2018_1/discussion/forum/9e3d6406fb204d649e1d204bdae1c0fa/threads/5aa08480459f0828dc000395',
    {
      params: {
        "ajax": 1,
        "resp_skip": 0,
        "resp_limit": 2000
      }
    }
  )
    .then((response) => {
      // console.log(response.data)
      var temp = [];
      response.data.content.children.forEach((element, index) => {
        temp.push(index + 1 + '->' + element.body)
      });
      temp.forEach(element => {
        console.log(element)
      });
      fs.writeFile('./' + "test.txt", temp.join(''), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
      });
      // for (item in response){
      //   console.log(response)
      // }
      res.send('yes')
    })
});

var server = app.listen(3000, function () {
});