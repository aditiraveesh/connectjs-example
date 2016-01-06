$('#ajaxButton').click(function() {
    $.ajax({
        url: '/remote/someJson',
        success: function(data) {
            $("#ajaxResponse").text(JSON.stringify(data));
        }
    });
});
