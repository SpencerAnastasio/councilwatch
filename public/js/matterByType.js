/* jshint camelcase:false */
'use strict';

var typesQuoteless = [];
var statusesQuoteless = [];
var requestersQuoteless = [];

function init(){//types, statuses, requesters){
  console.log("It Hits");
  matterCards(matters);
  // removeQuotes(matters, typesQuoteless);
};

function matterCards(data){
  for (let i = 0; i < data.length; i++){
    $("#matter-cards").append(''
      +'<div class="col">'
        +'<div class="card" style="width: 24rem;">'
          // +'<img src="..." class="card-img-top" alt="...">'
          +'<div class="card-body">'
            +'<a href="/legislation/matters/' + data[i].id + '" target=”_blank”><h3 class="card-title">' + data[i].body + '</h3></a>'
            +'<h4 class="card-title">' + data[i].type + '</h4>'
            +'<p class="card-title">' + data[i].title + '</p>'
            +'<h5 class="card-text">Status: ' + data[i].status + '</h5>'
            +'<h5 class="card-title">Requested by: ' + data[i].requester + '</h5>'
          +'</div>'
          // +'<ul class="list-group list-group-flush">'
          //   +'<li class="list-group-item">An item</li>'
          //   +'<li class="list-group-item">A second item</li>'
          //   +'<li class="list-group-item">A third item</li>'
          // +'</ul>'
          +'<div class="card-body">'
            // +'<a href="#" class="card-link">Card link</a>'
            +'<a href="/legislation/matters/' + data[i].id + '" class="card-link">View more information about this matter</a>'
          +'</div>'
        +'</div>'
      +'</div>'
      // +'<a href="/members/' + data[i].id + '"><h1>' + data[i].name + ' : ' + data[i].district + '</h1></a>'
    );
  };
};


function removeQuotes(data, arr){
  // console.log("It Hits");
  for (let i = 0; i < data.length; i++){
    if(data[i].id == undefined){
      arr.push({
        "name": data[i].name.replace(/^"(.*)"$/, '$1'),
      });
    }else{
      arr.push({
        "name": data[i].name.replace(/^"(.*)"$/, '$1'),
        "id": data[i].id//.replace(/^"(.*)"$/, '$1')
      });
    };
  };
  console.log(arr);
};

$(document).ready(init());//types, statuses, requesters));
