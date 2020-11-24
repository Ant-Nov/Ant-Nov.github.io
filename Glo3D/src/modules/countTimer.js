    const countTimer = (deadline) => {
        const timerH = document.getElementById('timer-hours');
        const timerM = document.getElementById('timer-minutes');
        const timerS = document.getElementById('timer-seconds');

        const getTimeRemain = () => {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            const sec = Math.floor(timeRemaining % 60);
            const min = Math.floor((timeRemaining / 60) % 60);
            const hou = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, sec, min, hou };
        };
        let timer = getTimeRemain();
        const updTime = () => {
            let plusZero = (time, show) => {
                show.textContent = time;
                if (time.toString().split('').length === 1) {
                    show.textContent = '0' + time;
                }
            };
            plusZero(timer.sec, timerS);
            plusZero(timer.min, timerM);
            plusZero(timer.hou, timerH);
        };

        if (timer.timeRemaining > 0) {
            setInterval(() => {
                timer = getTimeRemain();
                updTime();
            }, 1000);
            updTime();
        } else if (timer.timeRemaining < 0) {
            timerS.textContent = '00';
            timerM.textContent = '00';
            timerH.textContent = '00';
        }
    };
    
    export default countTimer;