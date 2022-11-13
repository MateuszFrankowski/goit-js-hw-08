const form = document.querySelector('form');
import throttle from 'lodash.throttle';
const saveToLocal = () => {
  if (data.message !== '' || data.email !== '') {
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
};
const data = {};
const handleInput = event => {
  console.log('pisze');
  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
};

form.addEventListener('input', handleInput);
const formState = localStorage.getItem('feedback-form-state');
if (formState) {
  const parsedFormState = JSON.parse(formState);

  form.elements.email.value = parsedFormState.email;
  form.elements.message.value = parsedFormState.message;
  console.log('updated');
}
form.addEventListener('input', throttle(saveToLocal, 500));

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
  console.log(`Email: ${data.email}, Message: ${data.message}`);
  event.currentTarget.reset();
  localStorage.clear();
};
form.addEventListener('submit', handleSubmit);
