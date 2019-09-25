$(document).ready(function() {
	$('#MultiStepForm').submit(function(e){
		e.preventDefault();
	});

	let namePattern = /^[A-Za-z]+$/;
	let emailPattern = /^[\w\.\-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	let firstName = document.getElementById('first_name');
	firstName.oninput = e => {

		if (e.target.value == "") {
			$('#first_name_error').html("This field can't be empty");
			$('#first_name_error').show();
		}
		else if ( !(e.target.value.match(namePattern)) ) {
			$('#first_name_error').show();
			$('#first_name_error').html('Please enter a valid first name');
			$('#StepOneNext').click(function(e){e.preventDefault();})
		}
		else $('#first_name_error').hide();
	}

	let email = document.getElementById('email');
	email.oninput = e => {

		if (e.target.value == "") {
			$('#email_error').html("This field can't be empty");
			$('#email_error').show();
		} else if ( !(e.target.value.match(emailPattern)) ) {
			$('#email_error').show();
			$('#email_error').html('Please enter a valid Email');
			$('#StepOneNext').click(function(e){e.preventDefault();})
		}
		else $('#email_error').hide();
	}


	$('#StepOneNext').click(function(e){

		if ( $('#email').val() == "" && $('#first_name').val() == "" ) {
			
			e.preventDefault();

			$('#first_name_error').html("This field can't be empty");
			$('#email_error').html("This field can't be empty");
			$('#first_name_error').show();
			$('#email_error').show();

		} else if ( $('#email').val() == "" ) {
			e.preventDefault();
			$('#email_error').html("This field can't be empty");
			$('#email_error').show();

		} else if ( $('#first_name').val() == "" ) {
			e.preventDefault();
			$('#first_name_error').html("This field can't be empty");
			$('#first_name_error').show();
		} else { 
				$('#StepOneContainer').hide();
				$('#StepTwoContainer').show();
		}

	});

	$('#StepTwoPrevious').click(function(){
		$('#StepOneContainer').show();
		$('#StepTwoContainer').hide();
	});


	let contactPattern = /^\+[0-9]+$/;
	let contact = document.getElementById('contact');
	contact.oninput = e => {

		if (e.target.value == "") {
			$('#contact_error').html("This field can't be empty");
			$('#contact_error').show();
		}
		else if ( !(e.target.value.match(contactPattern)) ) {
			$('#contact_error').show();
			$('#contact_error').html('Please enter a valid contact');
			$('#StepTwoNext').click(function(e){e.preventDefault();})
		}
		else $('#contact_error').hide();
	}

	let country = document.getElementById('country');
	country.oninput = e => {

		if (e.target.value == "") {
			$('#country_error').html("This field can't be empty");
			$('#country_error').show();
		} else if ( !(e.target.value.match(namePattern)) ) {
			$('#country_error').show();
			$('#country_error').html('Please enter a valid country name');
			$('#StepTwoNext').click(function(e){e.preventDefault();})
		}
		else $('#country_error').hide();
	}


	$('#StepTwoNext').click(function(e){

		if ( $('#country').val() == "" && $('#contact').val() == "" ) {
			
			e.preventDefault();

			$('#country_error').html("This field can't be empty");
			$('#contact_error').html("This field can't be empty");
			$('#country_error').show();
			$('#contact_error').show();

		} else if ( $('#country').val() == "" ) {
			e.preventDefault();
			$('#country_error').html("This field can't be empty");
			$('#country_error').show();

		} else if ( $('#contact').val() == "" ) {
			e.preventDefault();
			$('#contact_error').html("This field can't be empty");
			$('#contact_error').show();
		} else { 
				$('#StepTwoContainer').hide();
				$('#StepThreeContainer').show();
		}

	});

	$("#select_program").change(function () {
		if ( $('#select_program option:selected').val() == "" ) {
			$('#select_program_error').show();
			$('#StepThreeSubmit').click(function(e){e.preventDefault();})
		} else $('#select_program_error').hide();
	});

	let message = document.getElementById('message');
	message.oninput = e => {
		if (e.target.value == "") {
			$('#message_error').show();
			$('#StepThreeSubmit').click(function(e){e.preventDefault();})
		} else $('#message_error').hide();
	}

	$('#StepThreeSubmit').click(function(e){

		if ($('#select_program option:selected').val() == "" && message.value == "") {
			$('#select_program_error').show();
			$('#message_error').show();
			e.preventDefault();
		} else {
			$('form').hide();
			$('#SuccessContainer').css('display', 'flex');
		}
	});

	$('#StepThreePrevious').click(function(){
		$('#StepTwoContainer').show();
		$('#StepThreeContainer').hide();
	});

});