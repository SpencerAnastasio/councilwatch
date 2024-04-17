/* jshint camelcase:false */
'use strict';

var quoteless = [];

function memberCards(data){
  for (let i = 0; i < data.length; i++){
    $("#member-cards").append(''
      +'<div class="col">'
        +'<div class="card" style="width: 24rem;">'
          // +'<img src="..." class="card-img-top" alt="...">'
          +'<div class="card-body">'
            +'<a href="' + data[i].www + '" target=”_blank”><h5 class="card-title">' + data[i].name + '</h5></a>'
            +'<p class="card-text">' + data[i].district + '</p>'
          +'</div>'
          // +'<ul class="list-group list-group-flush">'
          //   +'<li class="list-group-item">An item</li>'
          //   +'<li class="list-group-item">A second item</li>'
          //   +'<li class="list-group-item">A third item</li>'
          // +'</ul>'
          +'<div class="card-body">'
            // +'<a href="#" class="card-link">Card link</a>'
            +'<a href="/members/' + data[i].id + '" class="card-link">View Voting History</a>'
          +'</div>'
        +'</div>'
      +'</div>'
      // +'<a href="/members/' + data[i].id + '"><h1>' + data[i].name + ' : ' + data[i].district + '</h1></a>'
    );
  };
};


function removeQuotes(data){
  for (let i = 0; i < data.length; i++){
    quoteless.push({
      "district": data[i].district.replace(/^"(.*)"$/, '$1'),
      "name": data[i].name.replace(/^"(.*)"$/, '$1'),
      "www": data[i].www.replace(/^"(.*)"$/, '$1'),
      "id": data[i].id.replace(/^"(.*)"$/, '$1')
    });
  };
  memberCards(quoteless);
};

$(document).ready(removeQuotes(members));
