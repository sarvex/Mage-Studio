Class("Dialog", {
    Dialog: function() {
        this.isLoaded = (swal != undefined);
        this.allowed = ['prompt', 'success', 'error', 'warn', 'info'];
    },

    prompt: function(_title, _message, callback) {
        if (this.allowed.indexOf("prompt") > -1) {
            swal({
                title: _title,
                text: _message,
                type: "input",
                showCancelButton: false,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function(inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                callback(inputValue);
                //swal("Nice!", "You wrote: " + inputValue, "success");
            });
        }
    },

    success: function(title, message, callback) {
        if (this.allowed.indexOf("success") > -1) {
            var _callback = (typeof(callback) == "function") ? callback : function() {};
            swal({
                "title": title,
                "text": message,
                "type": "success"
            }, _callback);
        }
    },

    error: function(title, message, callback) {
        if (this.allowed.indexOf("error") > -1) {
            var _callback = (typeof(callback) == "function") ? callback : function() {};
            swal({
                "title": title,
                "text": message,
                "type": "error"
            }, _callback);
        }
    },

    warn: function(title, message, callback) {
        if (this.allowed.indexOf("warn") > -1) {
            var _callback = (typeof(callback) == "function") ? callback : function() {};
            swal({
                "title": title,
                "text": message,
                "type": "warning"
            }, _callback);
        }
    },

    info: function(title, message, callback) {
        if (this.allowed.indexOf("info") > -1) {
            var _callback = (typeof(callback) == "function") ? callback : new Function();
            console.log(_callback);
            swal({
                "title": title,
                "text": message,
                "type": "info"
            }, _callback);
        }
    },
});
