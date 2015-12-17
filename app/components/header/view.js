define([
    'jquery',
    'underscore',
    'backbone',
    'text!header/template.html'
], function($, _, Backbone, Template){
    'use strict';
    var HeaderView = Backbone.View.extend({
        template: Template,
        
        el: 'header',

        initialize: function(){
            this.render();
        },

        render: function () {
            $(this.el).html(_.template(this.template));
            var $this = this;
            $(document).on('scroll', function(){
                if($(document).scrollTop() > 0){
                    $($this.el).addClass('menu--fixed');
                }else{
                    $($this.el).removeClass('menu--fixed');
                }
            });
        },
    });
    return HeaderView;
});