function qFunction() {
    $(function() {
        console.log($(indicator));
    $('.carousel').carousel('next');
    if ($('#indicator').hasClass('pre')) {
        $('#indicator').removeClass('pre');
        $('#indicator').addClass('drs');
        $('#indicator').html('Sandstorm');
    } else if ($('#indicator').hasClass('drs')) {
        $('#indicator').removeClass('drs');
        $('#indicator').addClass('tele');
        $('#indicator').html('Tele');
    } else if ($('#indicator').hasClass('tele')) {
        $('#indicator').removeClass('tele');
        $('#indicator').addClass('post');
        $('#indicator').html('PostGame');
    } else if ($('#indicator').hasClass('post')) {
        $('#indicator').removeClass('post');
        $('#indicator').addClass('pre');
        $('#indicator').html('Pre');
    }
    });
}
function gqFunction() {
    $(function() {
    $('.carousel').carousel('prev');
    if ($('#indicator').hasClass('pre')) {
        $('#indicator').removeClass('pre');
        $('#indicator').addClass('post');
        $('#indicator').html('Post');
    } else if ($('#indicator').hasClass('drs')) {
        $('#indicator').removeClass('drs');
        $('#indicator').addClass('pre');
       $('#indicator').html('Pre');
    } else if ($('#indicator').hasClass('tele')) {
        $('#indicator').removeClass('tele');
        $('#indicator').addClass('drs');
        $('#indicator').html('Sandstorm');
    } else if ($('#indicator').hasClass('post')) {
        $('#indicator').removeClass('post');
        $('#indicator').addClass('tele');
        $('#indicator').html('Tele');
    }
    });
}
