const form = document.querySelector('form');
import throttle from 'lodash.throttle';

const handleInput = event => {
  const data = {};
  //nie działa przy:  trailing: true i pisaniu znaków szybciej jak co 500ms
  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
  // działa
  // data.email = form.elements.email.value;
  // data.message = form.elements.message.value;

  if (data.message !== '' || data.email !== '') {
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
};

form.addEventListener(
  'input',
  throttle(handleInput, 500, {
    trailing: true,
  })
);
const formState = localStorage.getItem('feedback-form-state');
const parsedFormState = JSON.parse(formState);
if (parsedFormState) {
  form.elements.email.value = parsedFormState.email;
  form.elements.message.value = parsedFormState.message;
  console.log('updated');
}

const handleSubmit = event => {
  event.preventDefault();
  const data = {};
  const {
    elements: { email, message },
  } = event.currentTarget;
  data.email = email.value;
  data.message = message.value;
  console.log(`Email: ${data.email}, Message: ${data.message}`);
  event.currentTarget.reset();
  localStorage.clear(); // localStorage.removeItem('feedback-form-state');
};
form.addEventListener('submit', handleSubmit);
