$(document).ready(function () {



  // handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);



  // Imposta le date all'anno 2018
  var get2018month = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});
  var ajaxMonth = 0;


// Click successivo
$(document).on('click', '.succ', function() {
  ajaxMonth ++;
  $('.pr').addClass('prec');
  if (ajaxMonth >= 11) {
    $('.succ').removeClass('succ');
  }

  mese = get2018month.add(1, 'M').format(`MMMM`);
  $('h1').text(mese);
  $('.mese').text('');

  // Setta la data al mese corrente tramite ajaxMonth
  var getCurrentM = moment().locale('it').set({'year' : 2018, 'month' : ajaxMonth, 'date' : 1});

  printDays(getCurrentM);
  ajaxCall(ajaxMonth);
});


// Click Precedente
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

  // Setta la data al mese corrente tramite ajaxMonth
  var getCurrentM = moment().locale('it').set({'year' : 2018, 'month' : ajaxMonth, 'date' : 1});

  printDays(getCurrentM);
  ajaxCall(ajaxMonth);
});


function printDays(getCurrentM) {
  var daysIn = get2018month.daysInMonth();
  var giorno = getCurrentM.format(`D dddd`);
  var dataDay = getCurrentM.format(`YYYY-MM-DD`);

  for (var i = 0; i < daysIn; i++) {
      var context = {'giorno' : giorno, 'day' : dataDay};
      var html = template(context);
      $('.mese').append(html)
      giorno = getCurrentM.add(1, 'd').format(`D dddd`);
      dataDay = getCurrentM.format(`YYYY-MM-DD`);
  }
}





// Setta la data a Gennaio 2018 per generare il primo mese
var getGen2018 = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});

// prende il numero dei giorni presenti in questo mese
var daysIn = get2018month.daysInMonth();

// Prende il primo giorno dell'anno e lo trasforma nel formato da stampare nell'html
var giorno = getGen2018.format(`D dddd`);

var mese = getGen2018.format(`MMMM`);
$('h1').text(mese);


// Prende il primo giorno dell'anno e lo trasforma nel formato da mettere nel data-day
var dataDay = getGen2018.format(`YYYY-MM-DD`);


// ciclo che genera un array di giorni
  for (var i = 0; i < daysIn; i++) {
      var context = {'giorno' : giorno, 'day' : dataDay};
      var html = template(context);
      $('.mese').append(html)
      giorno = getGen2018.add(1, 'd').format(`D dddd`);
      dataDay = getGen2018.format(`YYYY-MM-DD`)
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
