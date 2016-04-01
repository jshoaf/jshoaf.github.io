// http://terminal.jcubic.pl/

jQuery(function($, undefined) {

  $(document).ready(function() {

    var nextID = 0;

    function echoHelp(term) {
      term.echo($("#help").html(), {raw:true});
    }

    function getNextString() {

      var typeSpeed = 50;
      var maxID = 6;

      nextID++;

      if (nextID <= maxID) {
        if (nextID > 1) {
          $("#typed" + (nextID - 1)).next().hide();
        }
        $("#typed" + nextID).typed('reset');
        $("#typed" + nextID).typed({
            stringsElement: $('#typed-strings' + nextID),
            typeSpeed: typeSpeed,
            startDelay: 1000,
            cursorChar: " ",
            callback: getNextString
        });
        $(".typed-cursor").html("&nbsp;");
      } else {
        typedsInitialized = true;
        $("#typed" + (nextID - 1)).next().hide();
        $("#term-soft").terminal().set_prompt("[?] > ");
        $("#term-soft").show();
        setTimeout(function() { $("#term-soft").terminal().exec("help"); }, 2000);
        $("#term-soft").terminal().focus(true);
      }

    };

    function reboot() {

      $("#term-soft").terminal().clear();
      $("#term-soft").hide();

      var term = $("#term-hard");

      $("span[id^=typed]").empty();
      $(".typed-cursor").remove();
      term.show();
      nextID = 0;
      getNextString(nextID);
    }

    function executeCommand(term, command) {

      switch(command) {
        case "help":
          echoHelp(term);
          break;
        case "career":
          term.echo($("#career").html(), {raw:true});
          break;
        case "github":
          term.echo("launching Github profile in new window...", {raw:true});
          term.echo("https://github.com/jshoaf");
          setTimeout(function() { window.open("https://github.com/jshoaf"); }, 1500);
          break;
        case "portfolio":
          term.echo("Sorry, not available at this time.  Coming soon...", {raw:true});
          break;
        case "linkedin":
          term.echo("launching LinkedIn profile in new window...", {raw:true});
          term.echo("http://www.linkedin.com/in/jshoaf");
          setTimeout(function() { window.open("http://www.linkedin.com/in/jshoaf"); }, 1500);
          break;
        case "reboot":
          term.clear();
          term.echo("rebooting...", {raw:true});
          term.set_prompt("");
          setTimeout(function() { reboot(); }, 1000);
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
                echoHelp(term);
            }
          }

      }
    }

    $(document).on("click", ".help_command", function() {

      var term = $("#term-soft").terminal();
      var command = $(this).text();

      if (command === "clear") {
        term.clear();
      } else {
        executeCommand(term, command);
      }
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('#term-soft').terminal(function(commandStr, term) {

      var command = commandStr.trim().toLowerCase();

      if (command !== '') {
        executeCommand(term, command);
      } else {
         term.echo('');
      }
      window.scrollTo(0,document.body.scrollHeight);
    }, {
      greetings: '',
      name: 'js_demo',
      prompt: '[?] > ',
      onClear: function() {
        $("#term-hard").hide();
      }
    });

    reboot();

    //$("#term-soft").show();
    //$("#term-soft").terminal().focus(true);

  });
});
