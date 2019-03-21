function getn(e) {
    var teamid = $(e).data('teamid');
    tmpObj = $(e).parent().parent().find('button[data-teamid="' + teamid + '"].single');
    tmpObj.removeClass('btn-success');
    tmpObj.addClass('btn-light');
}
function getmnmr(e) {
    var teamid = $(e).data('teamid');
    tmpObj = $(e).parent().parent().find('button[data-teamid="' + teamid + '"].climb');
    tmpObj.removeClass('btn-success');
}
function getmnm(e) {
    var teamid = $(e).data('teamid');
    tmpObj = $(e).parent().parent().find('button[data-teamid="' + teamid + '"].climb');
    tmpObj.removeClass('btn-success');
    tmpObj.addClass('btn-light');
}
function getmn(e) {
    var teamid = $(e).data('teamid');
    tmpObj = $(e).parent().parent().find('button[data-teamid="' + teamid + '"].rate');
    tmpObj.removeClass('btn-success');
    tmpObj.addClass('btn-light');
}
function fail(e) {
    if($(e).hasClass('btn-dark')){
        $(e).removeClass('btn-dark').addClass('btn-danger');
    }else{
        $(e).removeClass('btn-danger').addClass('btn-dark');
    }
}
function upDateteamnum(e) {
    v = $(e).parent().find('input[type=text]').val();
    c = $(e).data('teamid');
    $('span.badge[data-teamid='+c+']').html(v);
}

