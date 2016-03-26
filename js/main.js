// http://terminal.jcubic.pl/

jQuery(function($, undefined) {

  $(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();

    $('#term-soft').terminal(function(commandStr, term) {
      if (command !== '') {
        var command = commandStr.trim().toLowerCase();

        switch(command) {
          case "help":
            term.echo($("#help").html(), {raw:true});
            break;
          case "career":
            term.echo($("#career").html(), {raw:true});
            //$("#career p").each(function(index, element) {
            //  term.echo($(element).text());
            //});
            break;
          case "about":
            term.echo("Select the icon or type the command \"linkedin\" for more information", {raw:true});
            break;
          case "github":
            term.echo("launching Github profile in new window...", {raw:true});
            term.echo("https://github.com/jshoaf");
            setTimeout(function() { window.open("https://github.com/jshoaf"); }, 1500);
            break;
          case "linkedin":
            term.echo("launching LinkedIn profile in new window...", {raw:true});
            term.echo("http://www.linkedin.com/in/jshoaf");
            setTimeout(function() { window.open("http://www.linkedin.com/in/jshoaf"); }, 1500);
            break;
          default:
            if (command.substr(0, 5) == "login") {
              if (command.length > 6) {
                var username = command.substr(6, command.length - 6).trim();
                term.echo("Welcome " + username + ".");
                term.set_prompt("[" + username + "] > ");
              } else {
                term.echo("Login name not recognized.");
              }
            } else {
              try {
                  var result = window.eval(command);
                  if (result !== undefined) {
                      term.echo(new String(result));
                  }
              } catch(e) {
                  term.error(new String(e));
              }
            }

        }
      } else {
         term.echo('');
      }
      window.scrollTo(0,document.body.scrollHeight);
    }, {
      greetings: '',
      name: 'js_demo',
      prompt: '[guest] > '
    });
  });
});

var nextID = 0;

    $(function(){

      function getNextString() {

        var typeSpeed = 50;
        var maxID = 6;

        nextID++;

        if (nextID <= maxID) {
          if (nextID > 1) {
            $("#typed" + (nextID - 1)).next().hide();
          }
          $("#typed" + nextID).typed({
              stringsElement: $('#typed-strings' + nextID),
              typeSpeed: typeSpeed,
              startDelay: 1000,
              cursorChar: " ",
              callback: getNextString
          });
          $(".typed-cursor").html("&nbsp;");
        } else {
          $("#typed" + (nextID - 1)).next().hide();
          $("#term-soft").show();
          setTimeout(function() { $("#term-soft").terminal().exec("help"); }, 2000);
          $("#term-soft").terminal().focus(true);
        }

      };

      getNextString(nextID);
    });
