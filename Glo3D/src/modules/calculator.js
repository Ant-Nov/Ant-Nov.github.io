    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            total = document.getElementById('total');

        calcBlock.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('.calc-item') && !target.matches('.calc-type')) {
                let val = target.value;
                target.value = val.replace(/\D/gi, '');
            }
        });

        const animate = ({ duration, draw, timing }) => {
            let start = performance.now();
            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }
                let progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        };

        const countSum = () => {
            let totalVal = 0,
                countVal = 1,
                dayVal = 1;
            const typeVal = calcType.options[calcType.options.selectedIndex].value,
            squareVal = +calcSquare.value;

            if(calcCount.value > 1) {
                countVal += (calcCount.value - 1) / 10;
            }
            
            if(calcDay.value && calcDay.value < 5) {
                dayVal *= 2;
            } else if (calcDay.value >= 5 && calcDay.value <= 10) {
                dayVal *= 1.5;
            }

            if (typeVal && squareVal) {
                totalVal = price * typeVal * squareVal * countVal * dayVal;
            } else {
                totalVal = 0;
            }

            animate({
                duration: 1200,
                timing: function (timeFraction) {
                    return timeFraction;
                },
                draw: function (progress) {
                    total.textContent = Math.ceil(progress * totalVal);
                },
            });
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
                countSum();
            }
        });
    };

    export default calculator;