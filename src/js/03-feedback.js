const form = document.querySelector('form');
import throttle from 'lodash.throttle';

const handleInput = event => {
  console.log('email', event.currentTarget.elements.email.value);
  console.log('message', event.currentTarget.elements.message.value);
  const data = {};
  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
  if (data.message !== '' || data.email !== '') {
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
};
const inputThrottleUpdate = throttle(handleInput, 500);
form.addEventListener('input', inputThrottleUpdate);
const formState = localStorage.getItem('feedback-form-state');
const parsedFormState = JSON.parse(formState);
if (parsedFormState) {
  form.elements.email.value = parsedFormState.email;
  form.elements.message.value = parsedFormState.message;
  console.log('updated');
}

const handleSubmit = event => {
  const data = {};
  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
  event.currentTarget.reset();
  localStorage.clear();
  console.log(`Email: ${data.email}, Message: ${data.email}`);
};
form.addEventListener('submit', handleSubmit);
