let hour = 0;
let minute = 0;
let second = 0;
let milisecond = 0;
let interval = null;
let elapsedtime = 0;
let starttime = 0;
const laps = [];
let differnce = 0;

function updatefunction() {
    milisecond++;
    if (milisecond === 100) {
        milisecond = 0;
        second++;
    }
    if (second === 60) {
        second = 0;
        minute++;
    }
    if (minute === 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('display').textContent = 
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}:${milisecond.toString().padStart(2, '0')}`;
}

function preventintervals() {
    if (!interval) {
        starttime = Date.now() - elapsedtime;
        interval = setInterval(updatefunction, 10);
    }
}

function pausefunction() {
    clearInterval(interval);
    interval = null;
}

function resetfunction() {
    clearInterval(interval);
    interval = null;
    hour = 0;
    minute = 0;
    second = 0;
    milisecond = 0;
    elapsedtime = 0;
    starttime = 0;
    laps.length = 0;
    differnce = 0;
    document.getElementById('display').textContent = '00:00:00:00';
    document.getElementById('lap-ul').textContent = '';
    document.getElementById('diff-ul').textContent = '';
}

function lapfunction() {
    if (interval) {
        elapsedtime = Date.now() - starttime;
        laps.push(elapsedtime);
        let totalmilisecond = elapsedtime % 1000;
        let totalseconds = Math.floor(elapsedtime / 1000) % 60;
        let totalminutes = Math.floor(elapsedtime / (1000 * 60)) % 60;
        let totalhours = Math.floor(elapsedtime / (1000 * 60 * 60));
        if (laps.length > 1) {
            differnce = laps[laps.length - 1] - laps[laps.length - 2];
        } else {
            differnce = 0;
        }
        let diffmilisecond = differnce % 1000;
        let diffseconds = Math.floor(differnce / 1000) % 60;
        let diffminutes = Math.floor(differnce / (1000 * 60)) % 60;
        let diffhours = Math.floor(differnce / (1000 * 60 * 60));
        let lapResultUl = document.getElementById('lap-ul');
        let lapli = document.createElement('li');
        lapli.textContent = 
            `${totalhours.toString().padStart(2, '0')}:${totalminutes.toString().padStart(2, '0')}:${totalseconds.toString().padStart(2, '0')}:${Math.floor(totalmilisecond / 10).toString().padStart(2, '0')}`;
        lapResultUl.appendChild(lapli);
        let lapDiffUl = document.getElementById('diff-ul');
        let diffli = document.createElement('li');
        diffli.textContent = 
            `+${diffhours.toString().padStart(2, '0')}:${diffminutes.toString().padStart(2, '0')}:${diffseconds.toString().padStart(2, '0')}:${Math.floor(diffmilisecond / 10).toString().padStart(2, '0')}`;
        lapDiffUl.appendChild(diffli);
    }
}

const pointer = document.getElementById('circle-pointer');
let angle = 270;
let hand = null;

document.getElementById('start').addEventListener('click', () => {
    preventintervals();
    hand = setInterval(() => {
        elapsedtime = Date.now() - starttime;
        angle = 270 + ((elapsedtime / 1000) * 6) % 360;
        const radians = (angle * Math.PI) / 180;
        const radius = 120;
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);
        pointer.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }, 350 / 60);
});

document.getElementById('pause').addEventListener('click', () => {
    pausefunction();
    clearInterval(hand);
    hand = null;
});

document.getElementById('reset').addEventListener('click', () => {
    resetfunction();
    clearInterval(hand);
    hand = null;
    angle = 270;
    pointer.style.transform = `translate(4px, -118px) translate(-50%, -50%)`;
});
