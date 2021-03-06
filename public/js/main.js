var formData = new FormData();

(function($) {

    if (typeof audio_need == 'undefined') {
        console.log('Reading/Listening - Typing page generated');
    }
    else {
        console.log('Reading/Listening - Talking page generated');
    }

    var form = $("#survey-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
             element.before(error); 
        },
        rules: {
            gender : {
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
        },
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
        	if (currentIndex === 5) {
            	formData.append('pnum', document.getElementById('pnum').value);
            	formData.append('age', document.getElementById('age').value);
            	formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
            	var ethn = document.getElementById("ethchoice");
            	var ethnValue = ethn.options[ethn.selectedIndex].value;
            	if (ethnValue !== 'OT') {
            		formData.append('ethn', ethnValue);
            	}
            	else {
            		formData.append('ethn', document.getElementById('ethnicity_other').value);
            	}
            }
            
            if (typeof audio_need !== 'undefined' && currentIndex >= 6) {
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
            form.parent().parent().append('<h1 style="font-size: 1.6em">This survey is to study consumer information disclosure in the context of building a participant pool. For now you do not need to type any information. Please do not tell other people the purpose of the survey. <br><br>This is the end of the survey. Please close the window.</h1>').parent().addClass('finished');
            if (typeof audio_need == 'undefined') {
            	formData.append('q1', document.getElementById('name').value);
            	formData.append('q2', document.getElementById('birth').value);
            	formData.append('q3', document.getElementById('address').value);
            	formData.append('q4', document.getElementById('email').value);
            	formData.append('q5', document.getElementById('fb').value);
            	formData.append('q6', document.getElementById('fbid').value);
            	formData.append('q7', document.getElementById('phone').value);
            	formData.append('q8', document.getElementById('income').value);
            	formData.append('q9', document.getElementById('cookie').value);
            }
            console.log(Array.from(formData));
        	$.ajax({
			    url:  window.location.href,
			    data: formData,
			    type: 'POST',
			    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
			    processData: false, // NEEDED, DON'T OMIT THIS
			    success: function(success) {
			    	console.log(success);
			    },
			    error: function(error) {
			    	console.log(error);
			    }
			});
            
            return true;
        },
        onStepChanged : function (event, currentIndex, priorIndex) {
        	if (currentIndex >= 6) {
        		audioIndex = currentIndex - 6;
        		var audio_file = document.getElementById("question" + audioIndex);
        		if (audio_file != null) {
        			audio_file.play();
        			if (document.getElementById("recordButton" + audioIndex) != null) {
        				var target = document.getElementById("recordButton" + audioIndex);
	        			audio_file.onended = function() {
        					target.disabled = false;
							target.classList.remove("btn-secondary");
							target.classList.add("btn-primary");		
	        			}
        			} else if (document.getElementById('input' + audioIndex) != null) {
        				var target = document.getElementById('input' + audioIndex).firstElementChild;
        				audio_file.onended = function() {
        					target.readOnly = false;
	        			}
        			}
        		}
        	}
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

function CheckEthnicity(val) {
    var element = document.getElementById('ethnicity');
    var check = document.getElementById('ethnicity_other');
    if(val=='OT') {
        element.style.display = 'block';
        check.setAttribute("required", "");
    }
    else {
        element.style.display = 'none';
        check.removeAttribute("required")
    }
}