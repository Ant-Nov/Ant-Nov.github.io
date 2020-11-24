    const slider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            portfCont = document.querySelector('.portfolio-content'),
            portfDots = document.querySelector('.portfolio-dots');

        const addDots = () => {
            for (let i = 0; i < slides.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');

                portfDots.append(li);
            }
        };
        addDots();

        const dots = document.querySelectorAll('.dot');
        dots[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, i, strClass) => {
            elem[i].classList.remove(strClass);
        };

        const nextSlide = (elem, i, strClass) => {
            elem[i].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(dots, currentSlide, 'dot-active');
            nextSlide(slides, currentSlide, 'portfolio-item-active');
        };

        const startSlide = () => {
            interval = setInterval(autoPlaySlide, 3000);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        portfCont.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('.next')) {
                currentSlide++;
                if (currentSlide >= slides.length) {
                    currentSlide = 0;
                }
            } else if (target.matches('.prev')) {
                currentSlide--;
                if (currentSlide <= 0) {
                    currentSlide = slides.length - 1;
                }
            } else if (target.matches('.dot')) {
                dots.forEach((item, i) => {
                    if (item === target) {
                        currentSlide = i;
                    }
                });
            }

            nextSlide(dots, currentSlide, 'dot-active');
            nextSlide(slides, currentSlide, 'portfolio-item-active');
        });

        portfCont.addEventListener('mouseover', (event) => {
            if (
                event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')
            ) {
                stopSlide();
            }
        });

        portfCont.addEventListener('mouseout', (event) => {
            if (
                event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')
            ) {
                startSlide();
            }
        });

        startSlide();
    };

    export default slider;