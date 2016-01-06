$('#ajaxButton').click(function() {
    $.ajax({
        url: 'http://tomato:3001/remote/someJson',
        success: function(data) {
            $("#ajaxResponse").text(JSON.stringify(data));
        }
    });
});
