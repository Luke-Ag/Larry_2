var matchCounter = 0;
var matchList = [];

function up() {
  matchCounter += 1;
        updateMatchDisplay();
}

function down() {
  matchCounter -= 1;
        updateMatchDisplay();
}

$(function() { 
    $('.carousel').carousel('pause');
    $('button[data-ctr-action]').click(function() {
        id = $(this).data('ctr-id');
        teamid = $(this).data('teamid');
        console.log(id);
        val = parseInt($('[data-teamid=' + teamid + '][data-ctr-value=' + id + ']').html());
        console.log(val);
        if($(this).data('ctr-action') == '+') {
            val += 1;
        }else{
            val -= 1;
        }
        $('[data-teamid=' + teamid + '][data-ctr-value=' + id + ']').html(val);

    });
    $('button[data-btn-action]').click(function() {
        console.log($(this));
        if($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success');
            $(this).addClass('btn-light');
        } else { 
            $(this).addClass('btn-success');
            $(this).removeClass('btn-light');
        }
    });



    $.get('/events.json', function(d) {
      d = JSON.parse(d);
      d.forEach(function(e) {
        $('#eventSelector').append('<option value="' + e.event + '">' + e.event + '</option>')
      });
      matchList = d[0].matches;
        updateMatchDisplay();
    });

    $('#eventSelector').change(function() {
      $.get('/events/' + $(this).val() + '.json', function(d) {
        matchList = JSON.parse(d).matches;
        matchCounter = 0;
        updateMatchDisplay();
      });
    });

    $('[data-action=pushMatch]').click(function() {
      match = matchList[matchCounter];
      $.post('/scoutmaster/submit', {R1: match.red[0], R2: match.red[1], R3: match.red[2], B1: match.blue[0], B2: match.blue[1], B3: match.blue[2], MN: match.comp_level + match.match, EV: match.event }, function() {
        location.reload();
      });
    });

    $.get('/future', function(d) {
        data = JSON.parse(d);
            $('[data-team-field=1]').val(data.R1);
            $('[data-team-field=2]').val(data.R2);
            $('[data-team-field=3]').val(data.R3);
            $('[data-team-field=4]').val(data.B1);
            $('[data-team-field=5]').val(data.B2);
            $('[data-team-field=6]').val(data.B3);

        $('#matchNumber').val(data.MN);
        $('#eventID').val(data.EV);

        $('#eventSelector').val(data.EV);
        $.get('/events/' + data.EV + '.json', function(d) {
          matchList = JSON.parse(d).matches;

          $.each(matchList, function(i, e) {
            if(e.comp_level + e.match == data.MN) {
              console.log("FOUND " + data.MN);
              matchCounter = i;
              console.log(i);
            }
          });

          updateMatchDisplay();
          updateTeamNums();
        });


    });


});

function fail(e) {
    if($(e).hasClass('btn-dark')){
        $(e).removeClass('btn-dark').addClass('btn-danger');
    }else{
        $(e).removeClass('btn-danger').addClass('btn-dark');
    }
}

function updateMatchDisplay() {
  match = matchList[matchCounter];
  $('#matchNumber').html(match.comp_level + " " + match.match);
  $('#redTeamList').html(match.red.map(function(e) {return "<div>" + e + "</div>"}))
  $('#blueTeamList').html(match.blue.map(function(e) {return "<div>" + e + "</div>"}))
}
function submit() {
    parts = [];
    teamnos = [];
    $('input[type=text][data-teamid]').toArray().map(function(e) {return $(e).data('teamid')}).forEach(function(teamNumber) {
        teamnos.push("" + $('.badge[data-teamid=' + teamNumber + ']').html());
        payload = {};
        payload['team'] = "" + $('.badge[data-teamid=' + teamNumber + ']').html();
        payload['match'] = $('#matchNumber').val();
        set = $('[data-teamid=' + teamNumber + ']').filter(function(i, e) {
            e = $(e);
            if(e.val() == teamNumber) { return false; }
            if(e.html() == "+" || e.html() == "-") { return false; }
            if(e.hasClass('badge')) { return false; }
            if(e.hasClass('btn-info')) {return false;}
            return true;
        });

        counters = set.filter('span');
        $.each(counters, function(i, el) {
            el = $(el);
            payload[el.data('ctrId')] = el.html();
        });

        dps = set.filter('[data-datapoint]');
        dpNames = dps.toArray().map(function(e) {return $(e).data('datapoint')}).filter(function(v, i, s) {return s.indexOf(v) === i});
        dpNames.forEach(function(n) {
            payload[n] = '-';
        });
        $.each(dps, function(i, el) {
            el = $(el);
            if(el.hasClass('btn-success')) {
                payload[el.data('datapoint')] = el.html();
            }
        });

        payload['fail'] = set.filter('[data-fail]').hasClass('btn-danger') ? '1' : '-';
        if(set.filter('[data-comment]').length > 0) {
            payload['Scouting Comment'] = set.filter('[data-comment]').val();
        }

        parts.push(JSON.stringify(payload));
    });

    $.post('/form', {payload1: parts[0], payload2: parts[1], payload3: parts[2], payload4: parts[3], payload5: parts[4], payload6: parts[5]}, function(e) {
            location.reload();
    });
}

function qFunction() {
    console.log($(indicator));
    $('.carousel').carousel('next');
    if ($('#indicator').hasClass('pre')) {
        $('#indicator').removeClass('pre');
        $('#indicator').addClass('game');
        $('#indicator').html('Game');
    } else if ($('#indicator').hasClass('game')) {
        $('#indicator').removeClass('game');
        $('#indicator').addClass('post');
        $('#indicator').html('Post');
    } else if ($('#indicator').hasClass('post')) {
        $('#indicator').removeClass('post');
        $('#indicator').addClass('pre');
        $('#indicator').html('Pre');
    }
}
function gqFunction() {
    $('.carousel').carousel('prev');
    if ($('#indicator').hasClass('pre')) {
        $('#indicator').removeClass('pre');
        $('#indicator').addClass('post');
        $('#indicator').html('Post');
    } else if ($('#indicator').hasClass('game')) {
        $('#indicator').removeClass('game');
        $('#indicator').addClass('pre');
        $('#indicator').html('Pre');
    } else if ($('#indicator').hasClass('post')) {
        $('#indicator').removeClass('post');
        $('#indicator').addClass('game');
        $('#indicator').html('Game');
    }
}

function updateTeamNums() {
  for(i=1;i<=6;i++) {
    ele = $('input[type=text][data-team-field=' + i + ']');
    v = ele.val();
    c = ele.data('teamid');
    $('span.badge[data-teamid='+c+']').html(v);
    $('h4[data-teamid='+c+']').html(v);
  }
}

