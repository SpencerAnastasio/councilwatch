/* jshint camelcase:false */
'use strict';

var typesQuoteless = [];
var statusesQuoteless = [];
var requestersQuoteless = [];

function init(){//types, statuses, requesters){
  // console.log("It Hits");
  removeQuotes(types, typesQuoteless);
  removeQuotes(statuses, statusesQuoteless);
  removeQuotes(requesters, requestersQuoteless);
};

function matterCards(data){
  for (let i = 0; i < data.length; i++){
    // console.log("It Hits");
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
