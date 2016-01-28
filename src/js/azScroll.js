/*!
 * jQuery.azScroll
 * Copyright (c) 2016 Azat Khalilov  zminexx@gmail.com
 * License: MIT
 * @projectDescription Lightweight, cross-browser infinite scroll
 * @author Azat Khalilov
 * @version 0.0.1
 */
(function ($) {

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    PluginClass = function (element, options) {
        this.$element = null;
        this.element=null;
        this.upDebounce=null;
        this.bottomDebounce=null;
        this.topDebounce=null;
        this.lastPosTop=-1;


        this.init(element,options);
    };

    PluginClass.defaults = {
        distanceBottom: 1,
        distanceTop: 1,
        debounce: 250
    };

    PluginClass.prototype.init = function (element, options) {
        var self=this;
        this.element=element;
        this.$element=$(element);
        this.options=this.getOptions(options);
        this.$element.unbind(".azScroll").bind("scroll.azScroll", $.proxy(this.scrollEvent, this));
        this.bottomDebounce=debounce(function(){
            self.$element.trigger('reach.scroll','bottom');
        },this.options.debounce);
        this.topDebounce=debounce(function(){
            self.$element.trigger('reach.scroll','top');
        },this.options.debounce);
    };

    PluginClass.prototype.getOptions=function(options){
        return  $.extend({}, PluginClass.defaults, this.$element.data(), options);
    };

    PluginClass.prototype.checkTop=function() {
        var self=this;
        var curHeight=self.element.scrollTop - self.options.distanceTop;

        if (self.lastPosTop<0&&curHeight<0){
            self.lastPosTop=curHeight;
            return false;
        }
        self.lastPosTop=curHeight;
        return curHeight <= 0;
    };

    PluginClass.prototype.checkBottom=function() {
        var self=this;
        var curHeight=self.element.scrollHeight -self.element.scrollTop-self.options.distanceBottom;

        if (self.hasOwnProperty('lastPosBottom')&&self.lastPosBottom<self.element.clientHeight&&curHeight<self.element.clientHeight){
            self.lastPosBottom=curHeight;
            return false;
        }
        self.lastPosBottom=curHeight;
        return curHeight<= self.element.clientHeight
    };

    PluginClass.prototype.disable=function() {
        this.options.disabled=true;
    };

    PluginClass.prototype.enable=function() {
        this.options.disabled=false;
    };


    PluginClass.prototype.isScrollable=function () {
        return !this.options.disabled;
    };
    PluginClass.prototype.destroy=function(){
      this.$element.unbind('.azScroll').removeData('azScroll');
    };

    PluginClass.prototype.scrollEvent=function () {
        if (!this.isScrollable()) {
            return;
        }
        switch (this.options.direction) {
            case 'topbottom':
                if (this.checkBottom()) {
                    //this.$element.trigger('reach.scroll','bottom');
                    this.bottomDebounce();
                }
                if (this.checkTop()) {
                    this.topDebounce();

                }

                break;
            case 'top':
                if (this.checkTop()) {
                    this.topDebounce();
                }
                break;
            default:
                if (this.checkBottom()) {
                    this.bottomDebounce();
                }
        }
    };

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var options = (typeof option == 'object') && option;
            data = $this.data('azScroll');
            if (!data) {
                if (option == 'destroy') return;
                data = new PluginClass(this, options);
                $this.data(data);
            } else {
                if (options){
                    data.getOptions(options);
                }
            }
            if (typeof option == 'string') data[option]();
        });

    }

    $.fn.azScroll = Plugin;
    $.fn.azScroll.defaults = PluginClass.defaults;

})(jQuery);