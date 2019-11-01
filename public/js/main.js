(function($) {

    if (typeof audio_need !== 'undefined') {
        console.log('Reading - Typing page generated');
    }
    else {
        console.log('Reading - Talking page generated');
    }

    var form = $("#survey-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
             element.before(error); 
        },
        rules: {
            first_name : {
                required: true,
            },
            last_name : {
                required: true,
            },
            email : {
                required: true,
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
        highlight : function(element, errorClass, validClass) {
            $(element.form).find('.actions').addClass('form-error');
            $(element).parent().find('.form-label').addClass('form-label-error');
            $(element).removeClass('valid');
            $(element).addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element.form).find('.actions').removeClass('form-error');
            $(element).parent().find('.form-label').removeClass('form-label-error');
            $(element).removeClass('error');
            $(element).addClass('valid');
        }
    });
    form.children("div").steps({
        headerTag: "h2",
        bodyTag: "div",
        transitionEffect: "fade",
        labels: {
            previous : '<i class="hide"></i>',
            next : '<i class="zmdi zmdi-chevron-right"></i>',
            finish : '<i class="zmdi zmdi-chevron-right"></i>'
        },
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // if(currentIndex === 0) {
            //     form.parent().parent().parent().append('<div class="footer footer-' + currentIndex + '"></div>');
            // }
            // if(currentIndex === 1) {
            //     form.parent().parent().parent().find('.footer').removeClass('footer-0').addClass('footer-'+ currentIndex + '');
            // }
            // if(currentIndex === 2) {
            //     form.parent().parent().parent().find('.footer').removeClass('footer-1').addClass('footer-'+ currentIndex + '');
            // }
            // if(currentIndex === 3) {
            //     form.parent().parent().parent().find('.footer').removeClass('footer-2').addClass('footer-'+ currentIndex + '');
            // }
            // // if(currentIndex === 4) {
            // //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
            // // }
            
            if (typeof audio_need !== 'undefined' && currentIndex > 2) {
                if (audio_check) {
                    form.validate().settings.ignore = ":disabled,:hidden";
                    audio_check = false;
                    return form.valid();
                }
            }
            else {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            }
        },
        onFinishing: function (event, currentIndex)
        {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex)
        {
            form.parent().parent().append('<h1>This survey is to study consumer information disclosure in the context of building a participant pool. For now you do not need to type any information. Please do not tell other people the purpose of the survey.</h1>').parent().addClass('finished');
            return true;
        },
        onStepChanged : function (event, currentIndex, priorIndex) {

            return true;
        }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
    $(".toggle-password").on('click', function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
    });
})(jQuery);

$('ul[role="tablist"]').hide();