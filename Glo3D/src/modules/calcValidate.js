    const calcValidate = () => {
        const calcBlock = document.querySelector('.calc-block');
        calcBlock.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('.calc-item') && !target.matches('.calc-type')) {
                let val = target.value;
                target.value = val.replace(/\D/gi, '');
            }
        });
    };

    export default calcValidate;