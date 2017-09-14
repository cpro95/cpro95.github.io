var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./MediaElch.sqlite');
var jsonfile = require('jsonfile');
var util = require('util');

// db.all 전부다?
db.all("select content from movies where length(content) > 0", function(err,rows){
  if(err) {
    console.log(err);
  }
  // console.log(typeof(rows));
  // console.dir(rows);
  // db.all 로 쿼리하면 여러개의 쿼리 아이템(객체)이 나온다.
  // console.dir(rows);
  // console.log(rows[0].content);
  // 그 object는 바로  content : xml 형식이다.

  // 그래서 xml 은 rows.content로 하면 된다.
  console.log('Total Movies : ' + rows.length);
  var file = './moviedata.json';
  var Obj = [];
  for (var i = 0; i< rows.length; i++) {
      var xml=rows[i].content;
      var xml2js = require('xml2js');
      var Parser = new xml2js.Parser();
      Parser.parseString(xml, function(err, result) {
        // console.dir(result);

        Obj.push(result);
        // console.dir(Obj);
        // console.log(Obj[i].movie.title);
        // console.log(result.movie.title);
        // console.log('done===========================================');
      });
  }
  jsonfile.writeFile(file, Obj, function(err){
    if(err) {
      console.log(err);
    }
  });
  console.log('Converting sqlite3 db to json file has been completed');
});
