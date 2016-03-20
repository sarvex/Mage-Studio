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
            swal(title, message, "success", _callback);
        }
    },

    error: function(title, message, callback) {
        if (this.allowed.indexOf("error") > -1) {
            var _callback = callback ? callback : function() {};
            swal(title, message, "error", _callback);
        }
    },

    warn: function(title, message, callback) {
        if (this.allowed.indexOf("warn") > -1) {
            var _callback = callback ? callback : function() {};
            swal(title, message, "warning", _callback);
        }
    },

    info: function(title, message, callback) {
        if (this.allowed.indexOf("info") > -1) {
            var _callback = callback ? callback : function() {};
            swal(title, message, "info", _callback);
        }
    },
});
