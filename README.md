# Lesson 4.x - Homework

Created: Mar 26, 2020 12:04 AM
Created By: Andrew Yasynyshyn
Last Edited By: Andrew Yasynyshyn
Last Edited Time: Mar 26, 2020 10:01 AM

1. Read about The Browser Object Model (BOM)
2. Read about Regular Expressions - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
3. Finish form validation:

```
    // 1. Submit the form, only if it is valid
    //    email is between 5 and 50 chars long
    //    email format is correct
    //    name has 0 or 2 whitespaces benween words
    //    name length is 1 or more chars
    //    phone length is 12 or more digits
    //    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
    //    message is 10 or more characters.
    //    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
    // 2. Validate each input on the fly using onchange event.
    //    Event listeners must be added using js, eg: node.addEventListener(event, callback))
    // 3. Define re-usable validators: length, format,  
    function validateMe(event) {
      event.preventDefault();
    
      const emailNode = event.target.elements['email'];
      const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
      emailErrorNode.innerHTML = '';
    
      let emailErrors = document.createElement('ul');
      emailErrors.setAttribute("role", "alert");
    
      if (emailNode.value.length < 5 ) {
        let li = document.createElement('li');
        li.innerText = 'Email is too short';
        emailErrors.appendChild(li)
      }
    
      if (!emailNode.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        let li = document.createElement('li');
        li.innerText = 'Email format is incorrect';
        emailErrors.appendChild(li)
      }
    
      if (emailErrors.childElementCount > 0) {
        emailErrorNode.appendChild(emailErrors)
      }
    
      return false;
    }
```
