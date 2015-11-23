"use strict";
/**
 * @author Nener
 * @date   2015-11-22T17:15:18+0800
 */
(function($) {
  var pluginName = 'uploadfile';
  var getExt = function(file_name) {
    var result = /\.[^\.]+/.exec(file_name);
    return result;
  };
  var checkAccept = function(acceptArr, filename) {
    if ((!acceptArr) || acceptArr.length <= 0) {
      return true;
    }
    var ext = getExt(filename);
    if ($.inArray(ext, acceptArr) <= -1) {
      return false;
    }
    return true;
  };
  var beginupload = function(data) {
    var $this = $(this),
      settings = $this.data(pluginName),
      c = 0;
    if (!settings) {
      $.error('uploadfile not init');
      return $this;
    }
    var formdata = new FormData(),
      sendData = $.extend(true, {}, settings.data, data);
    $this.each(function(index) {
      if (checkAccept(settings.accept, $(this).val())) {
        var $item = $(this),
          fileObj = $item.get(0).files,
          paramname = $item.attr('name');
        for (var i = fileObj.length - 1; i >= 0; i--) {
          formdata.append(paramname + (c <= 0 ? "" : (c + '')), fileObj[i]);
          c++;
        }
        formdata.append("filepath" + (index <= 0 ? "" : index), $item.val());
      } else {
        settings.selectError.apply(this, $(this).val());
      }
    });
    if (sendData) {
      $.each(sendData, function(i, v) {
        formdata.append(i, v);
      });
    }
    $.ajax({
      url: settings.url,
      dataType: settings.dataType,
      method: "post",
      data: formdata,
      timeout: settings.timeout,
      processData: false,
      contentType: false,
      beforeSend: function() {
        settings.before.apply(this);
      },
      error: function(data) {
        settings.error.apply(this);
      },
      success: function(res) {
        settings.success.apply(this, res);
      },
      complete: function() {
        settings.complete.apply(this);
      }
    });

    return $this;
  }
  var methods = {
    init: function(options) {
      var settings = $.extend(true, {}, $.fn.uploadfile.defaults, options),
        $this = $(this);
      $this.attr('type', 'file');
      if (settings.accept && settings.length > 0) {
        if (typeof(settings.accept) == typeof([])) {
          $this.attr('accept', settings.accept.join(','));
        } else if (typeof(settings.accept) == typeof('')) {
          $this.attr('accept', settings.accept);
        } else {
          settings.accept = [];
          $.error("The options item accept type must be Array or string");
        }
      } else {
        var accept = $this.attr('accept');
        settings.accept = accept && accept.split(',');
      }
      $this.data(pluginName, settings);
      return $this;
    },
    upload: function(data) {
      var $this = $(this);
      return beginupload.apply(this, data);
    },
    destroy: function(options) {            
      return $(this).each(function() {                
        var $this = $(this);                
        $this.removeData(pluginName);            
      });        
    }
  };
  $.fn.uploadfile = function() {
    var $this = $(this),
      method = arguments[0],
      methodAgr;
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
    accept: [],
    timeout: 6000000,
    autoUpload: false,
    selectError: function(filename) {
      alert('The file ' + filename + ' not accept');
      return false;
    },
    before: function() {
      console.info("before upload file");
    },
    error: function() {
      console.error("upload file error");
    },
    success: function(data) {
      console.info("upload file success");
    },
    complete: function() {
      console.info("upload file complete");
    }
  };
})(jQuery);