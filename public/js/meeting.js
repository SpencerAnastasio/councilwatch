/* jshint camelcase:false */
'use strict';

var quoteless = [];

function meetingCards(data){
  for (let i = 0; i < data.length; i++){
    $("#meeting-cards").append(''
      +'<div class="col">'
        +'<div class="card" style="width: 24rem;">'
          // +'<img src="..." class="card-img-top" alt="...">'
          +'<div class="card-body">'
            +'<h5 class="card-title">' + data[i].body + '</h5>'
            +'<p class="card-text">Date: ' + data[i].date + '</p>'
            +'<p class="card-text">Time: ' + data[i].time + '</p>'
            +'<p class="card-text">Location: ' + data[i].location + '</p>'
          +'</div>'
          +'<ul class="list-group list-group-flush">'
            +'<li class="list-group-item"><a href="' + data[i].agenda + '" class="card-link">Agenda</a></li>'
            +'<li class="list-group-item"><a href="' + data[i].minutes + '" class="card-link">Minutes</a></li>'
            +'<li class="list-group-item"><a href="' + data[i].website + '" class="card-link">More Information</a></li>'
          +'</ul>'
          // +'<div class="card-body">'
          //   +'<a href="#" class="card-link">Card link</a>'
          //   +'<a href="/members/' + data[i].id + '" class="card-link">View Voting History</a>'
          // +'</div>'
        +'</div>'
      +'</div>'
      // +'<a href="/members/' + data[i].id + '"><h1>' + data[i].name + ' : ' + data[i].district + '</h1></a>'
    );
  };
};


function removeQuotes(data){
  for (let i = 0; i < data.length; i++){
    quoteless.push({
      "agenda": data[i].agenda.replace(/^"(.*)"$/, '$1'),
      "minutes": data[i].minutes.replace(/^"(.*)"$/, '$1'),
      "body": data[i].body.replace(/^"(.*)"$/, '$1'),
      "website": data[i].website.replace(/^"(.*)"$/, '$1'),
      "location": data[i].location.replace(/^"(.*)"$/, '$1'),
      "date": data[i].date.replace(/^"(.*)"$/, '$1'),
      "time": data[i].time.replace(/^"(.*)"$/, '$1')
    });
  };
  meetingCards(quoteless);
};

$(document).ready(removeQuotes(meetings));
