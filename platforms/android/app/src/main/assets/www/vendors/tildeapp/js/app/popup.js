var _popup = {

    open: function(data) {
        if ($('body popup').length <= 0) {
            $('body').append("<popup><div class='container'></div></popup>")
        }
        $('popup .container').html(data);
        $('popup').show();
        setTimeout(function() {
            $('popup .container, popup .icon.close').addClass("open");
        },100);
    },

    close: function() {
        $('popup .container, popup .icon.close').removeClass("open");
        setTimeout(function() {
            $('popup').hide();
        },600);
    },

}
