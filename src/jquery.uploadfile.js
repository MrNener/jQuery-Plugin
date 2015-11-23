/**
 * @author Nener(http://nener.me)
 * @date   2015-11-23T22:13:04+0800
 */
(function($) {
  "use strict";
  var pluginName = 'uploadfile';
  var getExt = function(filename) {
    return '.' + (filename.split('.').pop().toLowerCase());
  };
  var checkAccept = function(acceptArr, filename) {
    if ((!acceptArr) || acceptArr.length <= 0 || (!filename)) {
      return true;
    }
    var ext = getExt.call(this, filename);
    if ($.inArray(ext, acceptArr) <= -1) {
      return false;
    }
    return true;
  };
  var beginUpload = function(data) {
    var $this = $(this),
      settings = $this.data(pluginName),
      c = 0;
    if (!settings) {
      $.error('uploadfile not init');
      return $this;
    }
    var formdata = new FormData(),
      sendData = $.extend(true, {}, settings.data, data),
      passed = true;
    $this.each(function(index) {
      var $item = $(this),
        fileObj = $item.get(0).files,
        paramname = $item.attr('name');
      if ((!fileObj) || fileObj.length <= 0 || (!$item.val())) {
        passed = false;
        return false;
      }
      for (var i = fileObj.length - 1; i >= 0; i--) {
        formdata.append(paramname + (c <= 0 ? "" : (c + '')), fileObj[i]);
        c++;
      }
      formdata.append("filepath" + (index <= 0 ? "" : index), $item.val());
    });
    if (!passed) {
      return $this;
    }
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
        beforeSend: function(xhr) {
          settings.before.call(this, xhr);
        }
      }).done(function(data) {
        settings.success.call(this, data);
      })
      .fail(function(xhr) {
        settings.error.call(this, xhr);
      })
      .always(function(data) {
        settings.complete.call(this, data);
      });
    return $this;
  };
  var checkFileType = function() {
    var $this = $(this),
      settings = $this.data(pluginName);
    if (!checkAccept.call($this, settings.accept, $this.val())) {
      settings.selectError.call($this, $this.val());
      $this.val('');
      $this.click();
    }
    return $this;
  };
  var autoUpload = function() {
    var $this = $(this),
      settings = $this.data(pluginName);
    if ($this.val()) {
      if (checkAccept.call($this, settings.accept, $this.val())) {
        return beginUpload.call(this);
      }
    }
  };
  var methods = {
    init: function(options) {
      var settings = $.extend(true, {}, $.fn.uploadfile.defaults, options),
        $this = $(this);
      $this.attr('required', 'required');
      $this.attr('type', 'file');
      if (!settings.file) {
        if (!$this.attr('name')) {
          settings.file = 'file';
        } else {
          settings.file = $this.attr('name');
        }
      }
      $this.attr('name', settings.file);
      if (settings.accept && settings.accept.length > 0) {
        if (typeof(settings.accept) == typeof([])) {
          $this.attr('accept', settings.accept.join(',').toLowerCase());
          for (var i = settings.accept.length - 1; i >= 0; i--) {
            settings.accept[i] = settings.accept[i].toLowerCase();
          }
        } else if (typeof(settings.accept) == typeof('')) {
          $this.attr('accept', settings.accept);
          settings.accept = accept && accept.toLowerCase().split(',');
        } else {
          settings.accept = [];
          $.error("The options item accept type must be Array or string");
        }
      } else {
        var accept = $this.attr('accept');
        settings.accept = accept && accept.toLowerCase().split(',');
      }
      $this.data(pluginName, settings);
      $this.off('change', checkFileType);
      $this.on('change', checkFileType);
      $this.off('change', autoUpload);
      if (settings.autoUpload === true) {
        $this.on('change', autoUpload);
      }
      $this.val('');
      return $this;
    },
    upload: function(data) {
      var $this = $(this);
      if (!$this.val()) {
        $.error('Your must chose a file upload');
        return $this;
      }
      return beginUpload.call(this, data);
    },
    destroy: function() {            
      return $(this).each(function() {                
        var $this = $(this);                
        $this.removeData(pluginName);            
      });        
    }
  };
  $.fn.uploadfile = function() {
    if (!FormData) {
      $.error('Your browser is not support jQuery.' + pluginName);
      return this;
    }
    var $this = $(this),
      method = arguments[0],
      methodAgr;
    if (method === false) {
      method = methods.destroy;
      methodAgr = [];
    } else if (typeof(method) == 'object' || !method) {
      method = methods.init;
      methodAgr = arguments;
    } else if (method === true) {
      method = methods.upload;
      methodAgr = Array.prototype.slice.call(arguments, 1);
    } else if (methods[method]) {
      method = methods[method];
      methodAgr = Array.prototype.slice.call(arguments, 1);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
      return this;
    }
    return method.apply(this, methodAgr);
  };
  $.fn.uploadfile.defaults = {
    url: "/",
    file: 'file',
    accept: [],
    timeout: 6000000,
    autoUpload: false,
    dataType: "json",
    data: {},
    selectError: function(filename) {
      alert('The file [' + filename + '] not accept');
      return false;
    },
    before: function(xhr) {
      console.info("before upload file");
    },
    error: function(xhr) {
      console.error("upload file error");
    },
    success: function(data) {
      console.info("upload file success");
    },
    complete: function(data) {
      console.info("upload file complete");
    }
  };
})(jQuery);