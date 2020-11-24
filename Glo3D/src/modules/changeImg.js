    const changeImg = () => {
        const team = document.getElementById('command');
        team.addEventListener('mouseover', (event) => {
            let target = event.target;
            if (target.classList.contains('command__photo')) {
                let oldImage = target.src;
                target.src = target.dataset.img;
                target.addEventListener('mouseout', () => {
                    target.src = oldImage;
                });
            }
        });
    };

    export default changeImg;