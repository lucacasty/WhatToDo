var _navigator = {

    routing: function() {
        //Routing Permitted
        var hash = window.location.hash;
        var routes = {
            
        }

        /*
        if (hash !== "") {
            hash = hash.replace("#","");
            if (routes[hash] !== undefined) {
                var isAuth = routes[hash].auth;
                if ((isAuth) || !isAuth) {
                    _system.log("Init route: " + hash);
                    //if (_profile.account.logged()) {
                        _toolbar.show();
                    //}
                    setTimeout(function() {
                        routes[hash].action();
                    }, 10);
                    return true;
                }
            }
        }
        */

        return false;

    },

    home: {

        main: function(callback) {
            _toolbar.show();
            _views.home.show();
            _views.home.section('home');  
        },

        page2: function(callback) {
            _toolbar.show();
            _views.home.show();
            _views.home.section('home-page2');  
        },

        page3: function(callback) {
            _toolbar.show();
            _views.home.show();
            _views.home.section('home-page3');  
        },
    
    },

    page2: function(callback) {
        _toolbar.show();
        _views.page2.show();
        _views.page2.section('page2');  
    },

    page3: function(callback) {
        _toolbar.show();
        _views.page3.show();
        _views.page3.section('page3');  
    },


}

window.addEventListener('hashchange', function() {
    console.log(location.hash);
    //_system.back();
}, false)
