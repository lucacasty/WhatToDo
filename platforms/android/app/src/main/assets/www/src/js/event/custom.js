$(document).on("focus", "input.input-error", function() {
    $(this).removeClass("input-error");
});

$(document).on("focus", "input, .field.error input, .field.error select", function() {
    $(this).parents(".field").removeClass("error");
});

$(document).on("tap", ".show-password", function() {
    var field = $(this).parents('.field');
    var input = field.find('input');
    if (input.attr('type') == "password") {
        input.attr('type', 'varchar');
        //if (_system.isCordova()) input.attr('type', 'text');
        field.addClass("clear");
    } else {
        input.attr('type', 'password');
        //if (_system.isCordova()) input.attr('type', 'password');
        field.removeClass("clear");
    }    
});