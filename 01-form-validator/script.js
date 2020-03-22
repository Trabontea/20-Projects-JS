const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const checkPassword = document.getElementById('checkPassword');


//show input error message
function showError(input, message) {
  const formControl =  input.parentElement;
  formControl.className = 'form-control error';
  
  //pass the message error to small class
  const small = formControl.querySelector('small');
  small.innerText= message;
}

//show input succes message
function showSuccess(input) {  
  const formControl =  input.parentElement;
  formControl.className = 'form-control success';
}

//check email is valid

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) { 
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid')
  }
}

//Check requiered fileds 
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    console.log(input);
    
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least  ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than  ${max} characters`);
  } else {
    showSuccess(input);
  }
}


//check password Match
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Password do not match')
  }
}

//Get filedname on error
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//Event Listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(username.value);
  
  //call function with array parameter!!!
  checkRequired([username, email, password, checkPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, checkPassword);
});