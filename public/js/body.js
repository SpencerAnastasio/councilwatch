/* jshint camelcase:false */
'use strict';

var quoteless = [];

function bodyCards(data){
  for (let i = 0; i < data.length; i++){
    $("#body-cards").append(''
      +'<div class="col">'
        +'<div class="card" style="width: 24rem;">'
          // +'<img src="..." class="card-img-top" alt="...">'
          +'<div class="card-body">'
            +'<h5 class="card-title">' + data[i].name + '</h5>'
            +'<p class="card-text">Contact: ' + data[i].contact + '</p>'
          +'</div>'
          +'<ul class="list-group list-group-flush">'
            +'<li class="list-group-item">' + data[i].type + '</li>'
            +'<li class="list-group-item"><a href="#" class="card-link">' + data[i].pop + ' Members</a></li>'
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
      "id": data[i].id.replace(/^"(.*)"$/, '$1'),
      "contact": data[i].contact.replace(/^"(.*)"$/, '$1'),
      "name": data[i].name.replace(/^"(.*)"$/, '$1'),
      "pop": data[i].pop.replace(/^"(.*)"$/, '$1'),
      "type": data[i].type.replace(/^"(.*)"$/, '$1')
    });
  };
  bodyCards(quoteless);
};

$(document).ready(removeQuotes(bodies));
