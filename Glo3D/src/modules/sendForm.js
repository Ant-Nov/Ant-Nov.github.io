    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form1 = document.getElementById('form1'),
            form2 = document.getElementById('form2'),
            form3 = document.getElementById('form3');

        const errorDiv = document.createElement('div');

        const circle = document.createElement('div');
        circle.innerHTML = `
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        `;
        circle.classList.add('sk-circle');




        const formValidate = (form) => {
            
            
            errorDiv.classList.add('error');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.style.cssText = `
            color: red;
            font-size: 14px;
            `;
            
            const validValue = (target, regExp) => {
                if (regExp.test(target.value)) {
                        if(target.nextElementSibling && target.nextElementSibling.classList.contains('error')){
                            target.nextElementSibling.remove();
                        }
                        target.style.border = 'none';
                    } else {
                        target.style.border = '3px solid red';
                        target.insertAdjacentElement('afterend', errorDiv);
                        if (target.closest('#form1')) {
                            errorDiv.style.marginTop = '-20px';
                        } else {
                            errorDiv.style.marginTop = '0';
                        }
                        
                    }
            };

            form.addEventListener('change', (event) => {
                const target = event.target,
                    regTxt = /^[а-яё\s]+[а-яё]$/i,
                    regMess = /^[а-яё\s-?,?]+[а-яё\.?\!?\??]$/i,
                    regEmail = /^\w{1,15}\.?\-?(\w{1,8})?@\w{1,8}\.\w{2,4}$/i,
                    regTel = /(^8\d{10}$|^\+\d{11}$)/;
                if (target.type === 'text' && !target.classList.contains('mess')) {
                    validValue(target, regTxt);
                } else if (target.type === 'tel') {
                    validValue(target, regTel);
                } else if (target.type === 'email') {
                    validValue(target, regEmail);
                } else if (target.classList.contains('mess')) {
                    validValue(target, regMess);
                }
            });
        };
        
    
        
        const statusMessage = document.createElement('div');


        const postData = (body) => {

            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

        };

        const formRequest = (form) => {
            formValidate(form);
            
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                
                if (errorDiv.closest(`#${form.id}`) === form) {
                    return;
                }
                form.append(circle);
                
                statusMessage.textContent = '';
                form.append(statusMessage);

                statusMessage.style.color = 'white';
                
                const formData = new FormData(form);
                let body = {};

                const formInputs = [...form.elements].filter(item => item.tagName === 'INPUT' && item.type !== 'button');


                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, 
                    () =>{
                    statusMessage.textContent = succesMessage;
                    formInputs.forEach(item => item.value = '');
                    if (form.closest('.popup')) {
                        setTimeout(() => {
                            document.querySelector('.popup').style.display = 'none';
                        }, 1000);
                    }
                }, 
                    (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                    formInputs.forEach(item => item.value = '');
                }, () => {
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                });


                const succes = () =>{

                    circle.remove();
                    statusMessage.textContent = succesMessage;
                    
                    formInputs.forEach(item => item.value = '');
                    if (form.closest('.popup')) {
                        setTimeout(() => {
                            document.querySelector('.popup').style.display = 'none';
                        }, 1000);
                    }
                };

                const err = () => {
                    circle.remove();
                    statusMessage.textContent = errorMessage;
                    formInputs.forEach(item => item.value = '');
                };

                const deleteMessage = () => {
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                };

                postData(body)
                .then(response => {
                    if(response.status !== 200) {
                        throw new Error('Response status не равен 200');
                    }
                    succes();
                })
                .then(deleteMessage)
                .catch(error => {
                    console.error(error);
                    err();
                    deleteMessage();
                });



            });
        };
        formRequest(form1);
        formRequest(form2);
        formRequest(form3);
    };

    export default sendForm;