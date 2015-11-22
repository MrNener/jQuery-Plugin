"use strict";
/**
 * @author Nener
 * @date   2015-11-22T17:15:18+0800
 */
(function($) {
  var pluginName = 'uploadfile';
  var methods = {
    init: function(options) {
      var settings = $.extend(true,{}, $.fn.uploadfile.defaults, options);
      var $this = $(this);

      $this.data(pluginName, settings);
      return $this;
    },
    upload: function(data) {
      var $this = $(this);
      return $this;
    },
    destroy: function(options) {            
      return $(this).each(function() {                
        var $this = $(this);                
        $this.removeData(pluginName);            
      });        
    }
  };
  $.fn.uploadfile = function() {
    var $this = $(this);
    var method = arguments[0];
    var methodAgr;
    if (typeof(method) == 'object' || !method) {
      method = methods.init;
      methodAgr = arguments;
    } else if (typeof(method) == typeof(true) && method) {
      method = methods.upload;
      methodAgr = Array.prototype.slice.call(arguments, 1);
    } else if (methods[method]) {
      method = methods[method];
      methodAgr = Array.prototype.slice.call(arguments, 1);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery. ' + pluginName);
      return this;
    }
    return method.apply(this, methodAgr);
  };
  $.fn.uploadfile.defaults = {
    url: "/",
    dataType: "json",
    data: {},
    accept:[],
    timeout: 6000000,
    autoUpload: false,
    before: function() {
      console.info("before upload file");
    },
    error: function() {
      console.error("upload file error");
    },
    success: function() {
      console.info("upload file success");
    },
    complete: function() {
      console.info("upload file complete");
    }
  };
})(jQuery);