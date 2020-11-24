    const popup = () => {
        const btnPopup = document.querySelectorAll('.popup-btn'),
            popupMenu = document.querySelector('.popup'),
            popupCont = popupMenu.querySelector('.popup-content'),
            form3 = document.getElementById('form3'),
            inputs = [...form3.elements].filter(item => item.tagName === 'INPUT' && item.type !== 'button');

        btnPopup.forEach((item) => {
            item.addEventListener('click', () => {
                popupMenu.style.display = 'block';
                if (window.innerWidth > '768') {
                    popupCont.style.top = '-200%';
                    let count = -200;
                    let interval;
                    const menuAnimate = () => {
                        interval = requestAnimationFrame(menuAnimate);
                        count += 10;
                        if (count < 11) {
                            popupCont.style.top = count + '%';
                        } else {
                            cancelAnimationFrame(interval);
                        }
                    };

                    interval = requestAnimationFrame(menuAnimate);
                }
            });
        });

        popupMenu.addEventListener('click', (event) => {
            let target = event.target;
            if (
                target.classList.contains('popup') ||
                target.classList.contains('popup-close')
            ) {
                popupMenu.style.display = 'none';
                inputs.forEach((item) => {
                    item.value = '';
                    item.style.border = 'none';
                    if(item.nextElementSibling && item.nextElementSibling.classList.contains('error')){
                            item.nextElementSibling.remove();
                            
                        }


                });
            }
        });
    };

    export default popup;