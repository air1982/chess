define(function (require) {
    "use strict";
    var _ = require('underscore');
    var GuestUserTemplate = require('tpl!templates/user-guest-block.html');
    var RegUserTemplate = require('tpl!templates/user-reg-block.html');
    var Mediator= require('events');
    var Helpers = require('helpers/service');
    var formToJs = require('lib/form2js');
    
    var View = Backbone.View.extend({
        el: '.js-user-block',
        
        events: {
	    'click .js-dropdown': 'showDropdown',
	    'click #user-signup-form [type=submit]': 'signUpCheck',
	    'click #user-signin-form [type=submit]': 'signInCheck',
	    'click .js-logout': 'logOut',
	},
        
        initialize: function (options) {
	    _.bindAll(this);
	    this.appView = options.appView;
	    this.user = this.appView.user;
	},
        
        render: function () {
	    console.log('render user');
	    
	    if (!this.user.get('id')) this.$el.html(GuestUserTemplate({}));
	    else  this.$el.html(RegUserTemplate({user:this.user.get('email')}));
	},
	
	showDropdown: function (ev) {
	    var $elem = $(ev.currentTarget);
	    $elem.siblings().removeClass('open');
	    $elem.addClass('open');
	    Helpers.delayHide($elem, {removeClass: 'open'});
	},
			
	signInCheck: function (ev) {
	    ev.preventDefault();
	    var that = this;
	    var flag = true;
	    var form = this.$('#user-signin-form');
	    var data = form2js(form[0]);
	    
	    //Форму в правильное состояние состояние
	    this.formClear(form, data);
	    
	    flag = this.mailChecK(form, data); 
	    flag = this.passChecK(form, data);
	    
	    if (flag) {
		this.user.set(data);
		this.user.fetch({
		    success:function(data){
			//if (!_.has(data, 'error') ) {
			    that.userAuth(form);
			//}
		    }
		});
	    }
		
	    return false;
	},
	
	signUpCheck: function (ev) {
	    ev.preventDefault();
	    var flag = true;
	    var form = this.$('#user-signup-form');
	    var data = form2js(form[0]);
	    
	    //Форму в правильное состояние состояние
	    this.formClear(form, data)
	    
	    flag = this.mailChecK(form, data); 
	    flag = this.passChecK(form, data);
	    flag = this.confirmChecK(form, data); 
	        
	    if (flag) {
		this.user.save(data, {
		    success: function(){
			this.userAuth(form);
		    },
		    error: function(){
			alert('this email alreay exist')
		    }
		    
		});
	    }		
	    return false;
	},
	
	userAuth: function (form) {
	    console.log('auth!')
	    form.parents('js-dropdown').removeClass('open');
	    this.$el.html(RegUserTemplate({user:this.user.get('email')}));
	    Mediator.trigger('user:login');
	},
	
	logOut: function (form) {
	    console.log('logout!');
	    var that = this;
	    this.user.destroy({
		success:function(data){
		    that.$el.html(GuestUserTemplate({}));
		    that.user.clear();
		    Mediator.trigger('user:logout');
		}
	    });
	    	    
	},	
	
	formClear: function (form, data) {
	    form.find('.control-group').each(function(index, elem){
		var $elem = $(elem);
		$elem.removeClass('error');
		$elem.children('.help-inline').hide();
	    })
	},
	
	mailChecK: function (form, data) {
	    var reg = '^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$';
	    if (!_.has(data, 'email') || data.email.search(reg) == -1) {
		form.find('[name=email]').parent().addClass('error').children('.help-inline').show();
		return false;
	    }
	    return true;
	},
	
	passChecK: function (form, data) {
	    if (!_.has(data, 'password') || data.password=='' || data.password.length<5) {
		form.find('[name=password]').parent().addClass('error').children('.help-inline').show();
		return false;
	    }
	    return true;
	},
	
	confirmChecK: function (form, data) {
	    if (!_.has(data, 'password') || !_.has(data, 'confirm') || data.password!==data.confirm) {
		form.find('[name=confirm]').parent().addClass('error').children('.help-inline').show();
		return false;
	    }
	    return true;
	},
	
	
	
	
		
    })
    
    return View;
})