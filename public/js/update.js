function upDate() {
    $.get('/future', function(d) {
        color = "<%= @color %>";
        data = JSON.parse(d);
        if ("<%= @color %>" == 'red') {
            $('[data-team-field=1]').val(data.R1);
            $('[data-team-field=2]').val(data.R2);
            $('[data-team-field=3]').val(data.R3);
            $('[data-team-field=4]').val(data.B1);
            $('[data-team-field=5]').val(data.B2);
            $('[data-team-field=6]').val(data.B3);
        }
        if ("<%= @color %>" == 'blue') {
            $('[data-team-field=1]').val(data.B1);
            $('[data-team-field=2]').val(data.B2);
            $('[data-team-field=3]').val(data.B3);
            $('[data-team-field=4]').val(data.R1);
            $('[data-team-field=5]').val(data.R2);
            $('[data-team-field=6]').val(data.R3);
        }    
        $('#matchNumber').val(data.MN);
        $('#eventID').val(data.EV);
        $('[data-team-button=1]').click();
        $('[data-team-button=2]').click();
        $('[data-team-button=3]').click();
        $('[data-team-button=4]').click();
        $('[data-team-button=5]').click();
        $('[data-team-button=6]').click();
    });
}
var parts=[];
var teamnos=[];
function submit() {
    parts = [];
    teamnos = [];
    $('input[type=text][data-teamid]').toArray().map(function(e) {return $(e).data('teamid')}).forEach(function(teamNumber) {
        console.log(teamNumber);
        teamnos.push("" + $('.badge[data-teamid=' + teamNumber + ']').html());
        payload = {};
        payload['team'] = "" + $('.badge[data-teamid=' + teamNumber + ']').html();
        console.log($('.badge[data-teamid=' + teamNumber + ']').html());
        payload['match'] = $('#matchNumber').val();
        set = $('[data-teamid=' + teamNumber + ']').filter(function(i, e) {
            e = $(e);
            if(e.val() == teamNumber) { return false; }
            if(e.html() == "+" || e.html() == "-") { return false; }
            e = $(e);
            if(e.val() == teamNumber) { return false; }
            if(e.html() == "+" || e.html() == "-") { return false; }
            if(e.hasClass('badge')) { return false; }
            if(e.hasClass('btn-info')) {return false;}
            if(e.hasClass('nocount')) {return false;}
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
        if(set.filter('[data-start]').length > 0) {
            payload['startPos'] = set.filter('[data-start]').hasClass('btn-success') ? '0' : '1';
        }
        if(set.filter('[data-auto]').length > 0) {
            payload['sandComp'] = set.filter('[data-auto]').hasClass('btn-success') ? '0' : '1';
        }
        if(set.filter('[data-comment]').length > 0) {
            payload['Comment'] = set.filter('[data-comment]').val();
        }
        $.post('/form', {payload1: parts[0], payload2: parts[1], payload3: parts[2], payload4: parts[3], payload5: parts[4], payload6: parts[5]}, function(e) {
            faye.publish('/submit', {color: color, teams: teamnos})
                location.reload();
        });
        client.publish('/results', {text: 'Submit'});
}
