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

    moment(response[0].date);

    // Gennaio

    var set2018 = moment().locale('it').set({'year' : 2018, 'month' : 0, 'date' : 1});
    console.log(set2018);

    var daysInGen = set2018.daysInMonth(0);
    console.log(daysInGen);

    var giorno = set2018.format(`DDD dddd`);
    for (var i = 0; i < daysInGen; i++) {
      console.log(giorno);
        var context = { 'giorno' : giorno};
        var html = template(context);
        $('.gennaio').append(html)
        giorno = set2018.add(1, 'day').format(`DDD dddd`);

    }




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
