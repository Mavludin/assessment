$(document).ready(function() {
	$('#MultiStepForm').submit(function(e){
		e.preventDefault();
	});

	let namePattern = /[A-Za-z]+$/;
	let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
			$('#StepTwoNext').click(function(){
				$('#StepTwoContainer').hide();
				$('#StepThreeContainer').show();
			});
		}

	});

	$('#StepTwoPrevious').click(function(){
		$('#StepOneContainer').show();
		$('#StepTwoContainer').hide();
	});

	$('#StepTwoNext').click(function(){
		$('#StepTwoContainer').hide();
		$('#StepThreeContainer').show();
	});

	$('#StepThreePrevious').click(function(){
		$('#StepTwoContainer').show();
		$('#StepThreeContainer').hide();
	});

});