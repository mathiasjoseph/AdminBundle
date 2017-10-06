$("#checkAll").click(function () {
    $(".check-grid").prop('checked', $(this).prop('checked'));
});

$("select.select-batch-action").change(function(){
    setTimeout( function () {

        document.batch_action.submit();
    }, 300);

});