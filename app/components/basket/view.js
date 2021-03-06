define([
    'jquery',
    'underscore',
    'backbone',
    'text!basket/template.html',
    'basket/model',
    'basket/collection'
], function($, _, Backbone, Template, BasketModel, BasketCollection){
    'use strict';
    var moltin;
    var BasketView = Backbone.View.extend({
        
        el: '.basket',
        
        fetchBasket: function(moltin){
            var $this = this;
            moltin.Cart.Contents(function(items) {
                var products = {},
                    keys = [],
                    obj = items.contents;
                for(var k in obj){
                    keys.push(k);
                }
                for(var i = 0; i < items.total_unique_items; i++){
                    products[i] = items.contents[keys[i]];
                }
                var productCount = items.total_unique_items,
                    baskteItem = {},
                    basketArray = basketArray || [];
                
                for(var i = 0; i < productCount; i++){
                    basketItem[i] = new BasketModel({ 
                        id   : products[i].id,
                        title: products[i].title,
                        qty  : products[i].quantity,
                        image: products[i].images[0].url.https,
                        link : products[i].title.split(' ').join('-').toLowerCase(),
                        size : products[i].modifiers[0].var_title
                    });
                    basketArray.push(basketItem[i]);
                }
                var basketView = new BasketCollection(basketArray);
                $this.render(basketView);
            }, function(error) {
                // Something went wrong...
            });
        },

        initialize: function(Moltin){
            moltin = Moltin;
            this.fetchBasket(moltin);
        },

        render: function (rendered) {
            var template = _.template($(Template).html(), {rendered: rendered.models});
            $(this.el).html(template);
        },
    });
    return BasketView;
});