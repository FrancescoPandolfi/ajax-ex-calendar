$(document).ready(function () {



  // handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);



  // Imposta le date all'anno 2018
  var get2018 = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});
  var get2018month = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});
  var ajaxMonth = 0;

$(document).on('click', '.succ', function() {
  ajaxMonth ++;
  $('.pr').addClass('prec');
  if (ajaxMonth >= 11) {
    $('.succ').removeClass('succ');
  }

  mese = get2018month.add(1, 'M').format(`MMMM`);
  $('h1').text(mese);
  $('.mese').text('');


  var daysIn = get2018month.daysInMonth();
  var giorno = get2018.format(`D dddd`);
  var dataDay = get2018.format(`YYYY-MM-DD`);

  for (var i = 0; i < daysIn; i++) {
      var context = {'giorno' : giorno, 'day' : dataDay};
      var html = template(context);
      $('.mese').append(html)
      giorno = get2018.add(1, 'days').format(`D dddd`);
      dataDay = get2018.format(`YYYY-MM-DD`);
  }

  ajaxCall(ajaxMonth);


});

$('.prec').removeClass('prec');

$(document).on('click', '.prec', function() {
  ajaxMonth --;
  if (ajaxMonth <= 0) {
    $('.prec').removeClass('prec');
  }
  $('.su').addClass('succ');

  mese = get2018month.subtract(1, 'M').format(`MMMM`);
  $('h1').text(mese);
  $('.mese').text('');

  var daysIn = get2018month.daysInMonth();

  var giorno = get2018.format(`D dddd`);
  var dataDay = get2018.format(`YYYY-MM-DD`);

  for (var i = 0; i < daysIn; i++) {
      var context = {'giorno' : giorno, 'day' : dataDay};
      console.log(context);
      var html = template(context);
      $('.mese').append(html)
      giorno = get2018.add(1, 'd').format(`D dddd`);
      console.log(get2018);
      dataDay = get2018.format(`YYYY-MM-DD`);

  }

  ajaxCall(ajaxMonth);
});





// prende il numero dei giorni presenti in questo mese
var daysIn = get2018month.daysInMonth();

// Prende il primo giorno dell'anno e lo trasforma nel formato da stampare nell'html
var giorno = get2018.format(`D dddd`);

var mese = get2018.format(`MMMM`);
$('h1').text(mese);


// Prende il primo giorno dell'anno e lo trasforma nel formato da mettere nel data-day
var dataDay = get2018.format(`YYYY-MM-DD`);

// ciclo che genera un array di giorni
printDays(giorno, dataDay);

function printDays(giorno, dataDay){
  for (var i = 0; i < daysIn; i++) {
      var context = {'giorno' : giorno, 'day' : dataDay};
      var html = template(context);
      $('.mese').append(html)
      giorno = get2018.add(1, 'days').format(`D dddd`);
      dataDay = get2018.format(`YYYY-MM-DD`)
  }
}

ajaxCall(ajaxMonth);


});


// Funzioni

function ajaxCall(ajaxMonth) {

  $.ajax({
  url: "https://flynn.boolean.careers/exercises/api/holidays",
  method: "GET",
  data: {
    'year' : '2018',
    'month' : ajaxMonth
  },
  success: function (data, stato) {
    var response = data.response;
    $("li").each(function(){
      var currentLiAttr = $(this);
      response.forEach(function(item) {
        if (item.date == currentLiAttr.attr('data-day')) {
          currentLiAttr.append(`<span>${item.name}</span>`);
          currentLiAttr.addClass('festa');
        }
      });

    });

  },
  error: function (richiesta, stato, errore) {
    alert("E' avvenuto un errore. " + errore);
  }
  });

}
