require.config({
    shim: {
        semantic: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery		: '../bower_components/jquery/dist/jquery',
        backbone	: '../bower_components/backbone/backbone',
        underscore	: '../bower_components/lodash/dist/lodash',
        moltin		: '../bower_components/moltin/dist/moltin',
        text		: '../bower_components/requirejs-text/text',
        semantic    : '../bower_components/semantic/dist/semantic'
    }
});
require([
	'moltin',
	'app',
    //main views
    'header/view',
    'footer/view',
    'basket/view'
], function(moltin, App, HeaderView, FooterView, BasketView){
    'use strict';
    //initializing every main view
    new HeaderView();//render happens on init
    new FooterView();// ""
	//authenticating moltin
    moltin = new Moltin({ publicId: 'eXT0y3fLzXSoqSDW44AsA1y12CZKFEqELXWKN5IK' });
    moltin.Authenticate(function () {
    	//running app
        new BasketView(moltin);
    	App.initialize(moltin);
    });
});