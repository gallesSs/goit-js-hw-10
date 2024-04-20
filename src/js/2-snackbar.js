import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", checkSubmit)

function checkSubmit(evt) {
    evt.preventDefault();
    const delay = evt.target.elements.delay;
    const state = evt.target.elements.state;
    const enteredNum = delay.value;
    const choice = state.value;

    makePromise(enteredNum, choice)
        .then(value => {
            console.log(value);
        })
        .catch(error => {
            console.log(error);
        });
    form.reset();
}

function makePromise(enteredNum, choice) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (choice === "fulfilled") {
                resolve(iziToast.show({
                    ...optionsFulfilled,
                    message: `Fulfilled promise in ${enteredNum}ms`,
                }))
            } else {
                reject(iziToast.show({
                    ...optionsRejected,
                    message: `Rejected promise in ${enteredNum}ms`,
                }))
            }
        }, enteredNum);
    });
};

const optionsFulfilled = {
    title: '✔',
    titleColor: 'rgba(134, 253, 7, 1)',
    titleSize: '24px',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: 'rgba(89, 161, 13, 1)',
    timeout: 4000,
    position: 'topCenter',
};
const optionsRejected = {
    title: '✖',
    titleColor: 'rgba(255, 190, 190, 1)',
    titleSize: '24px',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: 'rgba(239, 64, 64, 1)',
    timeout: 4000,
    position: 'topCenter',
};