const baseInputClassName = 'promocode-input';

const initialFrameState = Symbol();

const frameStates = {
    [initialFrameState]: `${baseInputClassName}__initial`,
    0: `${baseInputClassName}__empty`,
    1: `${baseInputClassName}__error`,
    2: `${baseInputClassName}__success`,
};

const btn = document.getElementsByClassName('promocode-button')[0];
const input = document.getElementsByClassName(baseInputClassName)[0];

const random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const fakeCheckPromocode = (promocode) => {
    return new Promise((resolve) => {
        const delay = random(1, 5) * 1000;
        setTimeout(() => {
            if (promocode === '') resolve(0);
            resolve(random(1, 2));
        }, delay);
    });
};

const paintFrame = (result) => {
    if (result in frameStates) {
        input.classList.value = `${baseInputClassName} ${frameStates[result]}`;
    } else {
        console.error('Incorrect result');
        input.classList.value = `${baseInputClassName} ${frameStates[initialFrameState]}`;
    }
};

const onBtnClick = () => {
    const currentPromocode = input.value;
    btn.disabled = true;
    fakeCheckPromocode(currentPromocode)
        .then(paintFrame)
        .finally(() => {
            btn.disabled = false;
        })
};

btn.addEventListener('click', onBtnClick);