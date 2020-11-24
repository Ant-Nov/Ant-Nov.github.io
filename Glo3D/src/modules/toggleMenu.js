    const toggleMenu = () => {
        const body = document.querySelector('body'),
            blockMenu = document.querySelector('menu'),
            menuList = blockMenu.querySelectorAll('li'),
            serviceBlock = document.getElementById('service-block'),
            portfolio = document.getElementById('portfolio'),
            calculator = document.getElementById('calc'),
            team = document.getElementById('command'),
            questions = document.getElementById('connect'),
            scroll = [serviceBlock, portfolio, calculator, team, questions];

        body.addEventListener('click', (event) => {
            
            let target = event.target;

            if (
                target.closest('.menu') ||
                (target.closest('.active-menu') &&
                    target.nodeName !== 'LI' &&
                    target !== blockMenu)
            ) {
                blockMenu.classList.toggle('active-menu');
                event.preventDefault();
                if (target.parentNode.nodeName === 'LI') {
                    menuList.forEach((item, i) => {
                        if (target === menuList[i].firstChild) {
                            scroll[i].scrollIntoView({block: "start", behavior: "smooth"});
                        }
                    });
                }
            } else if (
                target.parentNode.nodeName === 'A' &&
                target.nodeName === 'IMG'
            ) {
                event.preventDefault();
                scroll[0].scrollIntoView({block: "start", behavior: "smooth"});
            } else if (
                blockMenu.className === 'active-menu' &&
                !target.classList.contains('active-menu') &&
                !target.closest('.active-menu')
            ) {
                blockMenu.classList.toggle('active-menu');
            }
        });
    };

    export default toggleMenu;