var bPar    = require('body-parser');
var express = require('express');
var request = require('request');
var http    = require('http');
var ejs     = require('ejs');
var fs      = require('fs');

var app = express();
var url = "127.0.0.1";
var uPar = bPar.urlencoded({extended: false});
// __dirname is the servers directory

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// app.use('/css', express.static('css'));

app.use('/', function(req, res, next){
  console.log('Request was made: ' + req.url);
  next();
});

// ---- /home
app.get('/', function(req, res){
  res.render('index.ejs');
});

// ---- /contact
app.get('/contact', function(req, res){
  res.render('contact.ejs');
});

// SEARCH ROUTES

// ---- /members
app.get('/members', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/persons";
  request(
    {url: Url},
    (error, response, body) => {
      var memberInfo = JSON.parse(body);
      // var nwo = [];
      var members = [];
      for (let i = 0; i < memberInfo.length; i++){
        // nwo.push({
        //   "cards": memberInfo[i],
        //   "www": JSON.stringify(memberInfo[i].PersonWWW),
        //   "name": JSON.stringify(memberInfo[i].PersonFullName),
        // });
        if(memberInfo[i].PersonWWW){
          var wwwArr = memberInfo[i].PersonWWW.split("/");
          if(wwwArr[4] == "Metro-Council-Members"){
            if(wwwArr[5] != undefined){
              members.push({
                "id": JSON.stringify(memberInfo[i].PersonId),
                "www": JSON.stringify(memberInfo[i].PersonWWW),
                "name": JSON.stringify(memberInfo[i].PersonFullName),
                "district": JSON.stringify(wwwArr[5])
              });
            };
          };
        };
      };
      // console.log(nwo.length);
      // for (let i = 0; i < nwo.length; i++){
      //   if(nwo[i].name == '"Jeff Eslick"'){
      //     console.log(nwo[i]);
      //   };
      //   console.log(nwo[i].name);
      //   console.log(nwo[i].www);
      //   console.log("---------------------------------------------------------");
      // };
      res.render('members/members.ejs', {"members": members});
    }
  );
});

app.get('/bodies', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/bodies";
  request(
    {url: Url},
    (error, response, body) => {
      var bodyInfo = JSON.parse(body);
      // var nwo = [];
      var bodies = [];
      for (let i = 0; i < bodyInfo.length; i++){
        // nwo.push({
        //   "cards": memberInfo[i],
        //   "www": JSON.stringify(memberInfo[i].PersonWWW),
        //   "name": JSON.stringify(memberInfo[i].PersonFullName),
        // });

        bodies.push({
          "id": JSON.stringify(bodyInfo[i].BodyId),
          "contact": JSON.stringify(bodyInfo[i].BodyContactEmail),
          "name": JSON.stringify(bodyInfo[i].BodyName),
          "pop": JSON.stringify(bodyInfo[i].BodyNumberOfMembers),
          "type": JSON.stringify(bodyInfo[i].BodyTypeName)
        });
      };
      // console.log(nwo.length);
      // for (let i = 0; i < nwo.length; i++){
      //   if(nwo[i].name == '"Jeff Eslick"'){
      //     console.log(nwo[i]);
      //   };
      //   console.log(nwo[i].name);
      //   console.log(nwo[i].www);
      //   console.log("---------------------------------------------------------");
      // };
      res.render('members/bodies.ejs', {"bodies": bodies});
    }
  );
});



// ---- /members/:id
app.get('/members/:id', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/persons/" + req.params.id + "/votes";
  request(
    {url: Url},
    (error, response, body) => {
      var voteRecord = JSON.parse(body);
      var votes = [];
      for (let i = 0; i < voteRecord.length; i++){
        votes.push({
          "name": JSON.stringify(voteRecord[i].VotePersonName),
          "vote": JSON.stringify(voteRecord[i].VoteValueName),
          "bill": JSON.stringify(voteRecord[i].VoteEventItemId)
        });
      };
      res.render('members/votes.ejs', {"votes": votes});
    }
  );
});

// ---- /meetings and agendas
app.get('/meetings', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/events";
  request(
    { url: Url },
    (error, response, body) => {
      data = JSON.parse(body);
      var meetings = [];
      for (let i = 0; i < data.length; i++){
        meetings.push({
          "agenda": JSON.stringify(data[i].EventAgendaFile),
          "minutes": JSON.stringify(data[i].EventMinutesFile),
          "body": JSON.stringify(data[i].EventBodyName),
          "website": JSON.stringify(data[i].EventInSiteURL),
          "location": JSON.stringify(data[i].EventLocation),
          "date": JSON.stringify(data[i].EventDate),
          "time": JSON.stringify(data[i].EventTime)
        });
      };
      res.render('meetings/meetings.ejs', {meetings: meetings});
    }
  );
});

// app.get('/agendas', function(req, res){
//   var Url = "https://webapi.legistar.com/v1/nashville/persons";
//   request(
//     { url: Url },
//     (error, response, body) => {
//       data = JSON.parse(body);
//       var agendas = [];
//       for (let i = 0; i < data.length; i++){
//         agendas.push({
//           "name": JSON.stringify(voteRecord[i].VotePersonName),
//           "vote": JSON.stringify(voteRecord[i].VoteValueName),
//           "bill": JSON.stringify(voteRecord[i].VoteEventItemId)
//         });
//       };
//       res.render('meetings/meetings.ejs', {members: meetings});
//     }
//   );
// });

// ---- /legislation
app.get('/legislation', function(req, res){
  var typesUrl = "https://webapi.legistar.com/v1/nashville/mattertypes";
  var statusesUrl = "https://webapi.legistar.com/v1/nashville/matterstatuses";
  var requestersUrl = "https://webapi.legistar.com/v1/nashville/matterrequesters";
  var types = [];
  var statuses = [];
  var requesters = [];
  request(
    { url: typesUrl },
    (error, response, body) => {
      data = JSON.parse(body);
      for (let i = 0; i < data.length; i++){
        types.push({id: data[i].MatterTypeId, name: data[i].MatterTypeName});
      };
      request(
        { url: statusesUrl },
        (error, response, body) => {
          data = JSON.parse(body);
          for (let i = 0; i < data.length; i++){
            statuses.push({id: data[i].MatterStatusId, name: data[i].MatterStatusName});
          };
          request(
            { url: requestersUrl },
            (error, response, body) => {
              data = JSON.parse(body);
              for (let i = 0; i < data.length; i++){
                requesters.push({name: data[i].MatterRequesterName});
              };
              // console.log("---------------------------------------------------------");
              // for (let i = 0; i < types.length; i++){
              //   console.log(types[i].name);
              //   console.log(statuses[i].name);
              //   console.log(requesters[i].name);
              //   console.log("---------------------------------------------------------");
              // };
              res.render('legislation/legislation.ejs', {"types": types, "statuses": statuses, "requesters": requesters});
            }
          );
        }
      );
    }
  );
  // console.log("---------------------------------------------------------");
  // for (let i = 0; i < requesters.length; i++){
  //   console.log(types[i].name);
  //   console.log(statuses[i].name);
  //   console.log(requesters[i].name);
  //   console.log("---------------------------------------------------------");
  // };
  // res.render('legislation.ejs', {"types": types, "statuses": statuses, "requesters": requesters});
});

app.get('/legislation/types/:id', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/matters";
  request(
    {url: Url},
    (error, response, body) => {
      var matterInfo = JSON.parse(body);
      var matters = [];
      for (let i = 0; i < matterInfo.length; i++){
        if(matterInfo[i].MatterTypeId == req.params.id){
          matters.push({
            "id": JSON.stringify(matterInfo[i].MatterId),
            "title": JSON.stringify(matterInfo[i].MatterTitle),
            "type": JSON.stringify(matterInfo[i].MatterTypeName),
            "requester": JSON.stringify(matterInfo[i].MatterRequester),
            "body": JSON.stringify(matterInfo[i].MatterBodyName),
            "status": JSON.stringify(matterInfo[i].MatterStatusName)
          });
        };
      };
      // console.log(nwo.length);
      // for (let i = 0; i < nwo.length; i++){
      //   if(nwo[i].name == '"Jeff Eslick"'){
      //     console.log(nwo[i]);
      //   };
      //   console.log(nwo[i].name);
      //   console.log(nwo[i].www);
      //   console.log("---------------------------------------------------------");
      // };
      res.render('legislation/mattersByType.ejs', {"page": "Types", "matters": matters});
    }
  );
});

app.get('/legislation/matters/:id', function(req, res){
  var Url = "https://webapi.legistar.com/v1/nashville/matters/" + req.params.id;
  request(
    {url: Url},
    (error, response, body) => {
      var matterInfo = JSON.parse(body);
      var matter = [];
      matter.push({
        "id": JSON.stringify(matterInfo.MatterId),
        "title": JSON.stringify(matterInfo.MatterTitle),
        "type": JSON.stringify(matterInfo.MatterTypeName),
        "requester": JSON.stringify(matterInfo.MatterRequester),
        "body": JSON.stringify(matterInfo.MatterBodyName),
        "status": JSON.stringify(matterInfo.MatterStatusName)
      });
      res.render('legislation/matterById.ejs', {"matter": matter});
    }
  );
});


// app.post('/search/*', uPar, function(req, res){
//   res.render('searchProfile.ejs', {member: req.body.member});
// });

// app.post('/whisky/:name', function(req, res){
//   res.render('whiskyProfile.ejs', {whisky: req.params.name, person: residents.humans, notes: flavorNotes});
// });

app.listen(3000);
console.log(`View Localhost '${url}' in the browser.`);
console.log('Listening on PORT 3000:');
