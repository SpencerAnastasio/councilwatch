/* jshint camelcase:false */
'use strict';

var quoteless = [];

function memberCards(data){
  for (let i = 0; i < data.length; i++){
    console.log(data[i].name);
    $("#vote-cards").append(''
      +'<div class="col">'
        +'<div class="card" style="width: 24rem;">'
          // +'<img src="..." class="card-img-top" alt="...">'
          +'<div class="card-body">'
            +'<h5 class="card-title">' + data[i].name + '</h5></a>'
            +'<p class="card-text">Vote - ' + data[i].vote + '</p>'
          +'</div>'
          // +'<ul class="list-group list-group-flush">'
          //   +'<li class="list-group-item">An item</li>'
          //   +'<li class="list-group-item">A second item</li>'
          //   +'<li class="list-group-item">A third item</li>'
          // +'</ul>'
          +'<div class="card-body">'
            // +'<a href="#" class="card-link">Card link</a>'
            +'<a href="/legislation/matters/' + data[i].bill + '" class="card-link">Bill - ' + data[i].bill + '</a>'
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
      "name": data[i].name.replace(/^"(.*)"$/, '$1'),
      "vote": data[i].vote.replace(/^"(.*)"$/, '$1'),
      "bill": data[i].bill.replace(/^"(.*)"$/, '$1')
    });
  };
  memberCards(quoteless);
};

$(document).ready(removeQuotes(votes));
