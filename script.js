$(document).ready(function () {

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);


// gennaio

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
    console.log(response[0].name);
    console.log(response[0].date);
    console.log(moment(response[0].date).locale('it').format(`DDD dddd`));


    // Gennaio

    // Imposta la data al 1 gennaio 2018
    var get2018 = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});

    // prende il numero dei giorni presenti in questo mese
    var daysIn = get2018.daysInMonth(0);

    // Prende il primo giorno dell'anno
    var giorno1 = get2018.format(`DDD dddd`);
    var gennaio = [giorno1];

    // ciclo che genera un array di giorni
    for (var i = 1; i < daysIn; i++) {
        gennaio.push(get2018.add(1, 'day').format(`DDD dddd`));
    }
    console.log(gennaio);


    gennaio.forEach(function(item) {
      var context = { 'giorno' : item};
      var html = template(context);
      $('.gennaio').append(html)
    });





    // response.forEach(function (obj, i) {
    //   console.log(obj);
    //   var source = $("#entry-template").html();
    //   var template = Handlebars.compile(source);
    //   var context = { 'giorno' : obj.name + obj.date};
    //   var html = template(context);
    //   $('.gennaio').append(html)
    // });


  },
  error: function (richiesta, stato, errore) {
    alert("E' avvenuto un errore. " + errore);
  }
});


















});
