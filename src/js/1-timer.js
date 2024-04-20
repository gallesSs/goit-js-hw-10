import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
    input: document.querySelector("#datetime-picker"),
    button: document.querySelector("button[data-start]"),
    day: document.querySelector("span[data-days]"),
    hour: document.querySelector("span[data-hours]"),
    minute: document.querySelector("span[data-minutes]"),
    second: document.querySelector("span[data-seconds]")
}
let userSelectedDate;
elements.button.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = Date.now();
        if (selectedDates[0] <= currentTime) {
            iziToast.show(iziToastOptions);
            elements.button.disabled = true;
        } else {
            elements.button.disabled = false;
            userSelectedDate = selectedDates[0];
        }
        return;
    },
};
const iziToastOptions = {
    title: '✖',
    titleColor: '#FFFFFF',
    titleSize: '24px',
    message: 'Please choose a date in the future',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: '#B51B1B',
    timeout: 4000,
    overlay: true,
    overlayClose: true,
    position: 'topCenter',
};

function updateClock({ days, hours, minutes, seconds }) {
    elements.day.textContent = `${days}`
    elements.hour.textContent = `${hours}`
    elements.minute.textContent = `${minutes}`
    elements.second.textContent = `${seconds}`;
}

elements.button.addEventListener("click", start);

function start() {
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const countdown = userSelectedDate - currentTime;
        if (countdown <= 0) {
            clearInterval(intervalId);
            elements.input.disabled = false;
            elements.button.disabled = false;
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(countdown);
        updateClock({ days, hours, minutes, seconds });
        elements.input.disabled = true;
        elements.button.disabled = true;
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}


flatpickr("#datetime-picker", options);