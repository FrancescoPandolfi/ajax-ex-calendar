$(document).ready(function () {

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);


// Imposta la data al 1 gennaio 2018
var get2018 = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});

// prende il numero dei giorni presenti in questo mese
var daysIn = get2018.daysInMonth(0);

// Prende il primo giorno dell'anno e lo trasforma nel formato da stampare nell'html
var giorno = get2018.format(`DD dddd`);

// Prende il primo giorno dell'anno e lo trasforma nel formato da mettere nel data-day
var dataDay = get2018.format(`YYYY-MM-DD`);

// ciclo che genera un array di giorni
for (var i = 0; i < daysIn; i++) {
    var context = {'giorno' : giorno, 'day' : dataDay};
    var html = template(context);
    $('.gennaio').append(html)
    giorno = get2018.add(1, 'days').format(`DD dddd`);
    dataDay = get2018.format(`YYYY-MM-DD`)

}




$.ajax({
url: "https://flynn.boolean.careers/exercises/api/holidays",
method: "GET",
data: {
  'year' : '2018',
  'month' : 0
},
success: function (data, stato) {
  var response = data.response;
  console.log(response);
  // console.log(response[0].name);
  // console.log(response[0].date);
  console.log(moment(response[1].date).locale('it').format(`DDD dddd`));

  $('.li').forEach(function (item) {
    console.log(item);
  });

},
error: function (richiesta, stato, errore) {
  alert("E' avvenuto un errore. " + errore);
}
});















});
