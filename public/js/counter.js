var faye;
var color;
var yis;
$(function() {
    upDate();
    faye = new Faye.Client('/faye');
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
    $('.carousel').carousel('pause');
    $(document).on('keyup',
        Konami.code(function() {
            setTimeout(function(){
                mit();
            }, 250); 
        })
    );
});

