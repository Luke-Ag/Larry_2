function sortTable(f,n){
    var rows = $('#trend tbody  tr').get();

    rows.sort(function(a, b) {


    });

    function getVal(elm){
        var v = $(elm).children('td').eq(n).text().toUpperCase();
        if($.isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    $.each(rows, function(index, row) {
        $('#trend').children('tbody').append(row);
    });
}
var f_nm = 1;
var f_hp = 1;
$("#nm").click(function(){
    f_nm *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_nm,n);
});
$("#hp").click(function(){
    f_hp *= -1;
    var n = $(this).prevAll().length;
    sortTable(f_hp,n);
});
