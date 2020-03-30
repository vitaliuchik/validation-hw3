// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,


class Validator {
  constructor() {
    this.name = this.getData('name');
    this.email = this.getData('email');
    this.phone = this.getData('phone');
    this.message = this.getData('message');

    this.nameError = this.getHelp(this.name);
    this.emailError = this.getHelp(this.email);
    this.phoneError = this.getHelp(this.phone);
    this.messageError = this.getHelp(this.message);

    this.activator = false;
    this.listeners();
  }

  validateMe() {
    let isValid = true;
    if (!this.validateName()) isValid = false;
    if (!this.validateEmail()) isValid = false;
    if (!this.validatePhone()) isValid = false;
    if (!this.validateMessage()) isValid = false;

    return isValid;
  }

  getData(id) {
    return document.getElementById(id);
  }

  getHelp(el) {
    return el.parentNode.querySelector('p.help-block');
  }

  validateName() {
    this.nameError.innerHTML = '';
    const value = this.name.value;

    let node = document.createElement('ul');
    node.setAttribute('role', 'alert');

    if (!this.lengthIsValid(value, 1, null))
      this.addError(node, "Name is too short");
    if (!this.formatIsValid(value, /\w\s\w|\w\s\s\s+\w/, true))
      this.addError(node, "Name must have 0 or 2 spaces between words");

    if (node.childElementCount > 0) {
      this.nameError.appendChild(node);
      return false;
    }
    return true;
  }

  validateEmail() {
    this.emailError.innerHTML = '' ;
    const value = this.email.value;

    let node = document.createElement('ul');
    node.setAttribute('role', 'alert');

    if (!this.lengthIsValid(value, 5, 50))
      this.addError(node, "Email length must be more than 4 and less than 51");
    if (!this.formatIsValid(value, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      this.addError(node, "Email format is wrong");

    if (node.childElementCount > 0) {
      this.emailError.appendChild(node);
      return false;
    }
    return true;
  }

  validatePhone() {
    this.phoneError.innerHTML = '';
    const value = this.phone.value;

    let node = document.createElement('ul');
    node.setAttribute('role', 'alert');

    if (!this.lengthIsValid(value, 12, null))
      this.addError(node, "Phone is too short");
    if (!this.formatIsValid(value,  /[+|0]?\d{3}\(?\d{2}\)?[\s|\-]?\d{3}[\s|\-]?\d{3}[\s|\-]?\d{2}/))
      this.addError(node, "Phone format is wrong");

    if (node.childElementCount > 0) {
      this.phoneError.appendChild(node);
      return false;
    }
    return true;
  }

  validateMessage() {
    this.messageError.innerHTML = '';
    const value = this.message.value;

    let node = document.createElement('ul');
    node.setAttribute('role', 'alert');

    if (!this.lengthIsValid(value, 10, null))
      this.addError(node, "Message is too short");
    if (!this.formatIsValid(value,  /(?:^|\W)(ugly|dumm|stupid|pig|ignorant)(?:$|\W)/i, true))
      this.addError(node, "Message has bad language");

    if (node.childElementCount > 0) {
      this.messageError.appendChild(node);
      return false;
    }
    return true;
  }

  lengthIsValid(value, minLength = null, maxLength = null) {
    if (minLength == null && maxLength == null) return true;
    if (minLength == null) return value.length <= maxLength;
    if (maxLength == null) return value.length >= minLength;
    return value.length <= maxLength && value.length >= minLength;
  }

  formatIsValid(value, regex, opposite = false) {
    if (regex == null) return true;
    if (opposite) return !value.match(regex);
    return value.match(regex);
  }

  addError(node, error) {
    let li = document.createElement('li');
    li.innerText = error;
    node.appendChild(li);
  }

  listeners() {
    if (this.activator) return;
    this.name.addEventListener(   'change', () => this.validateName());
    this.email.addEventListener(  'change', () => this.validateEmail());
    this.phone.addEventListener(  'change', () => this.validatePhone());
    this.message.addEventListener('change', () => this.validateMessage());
    this.activator = true;
  }



}

var validator;
function validateMe(event) {
  event.preventDefault();
  if (!validator) validator = new Validator();
  return validator.validateMe();
}
