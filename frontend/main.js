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

const checkPromocode = (promocode) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3000/promocode',
        data: { promocode },
    });
}

const paintFrame = (status) => {
    if (status in frameStates) {
        input.classList.value = `${baseInputClassName} ${frameStates[status]}`;
    } else {
        console.error('Incorrect result');
        input.classList.value = `${baseInputClassName} ${frameStates[initialFrameState]}`;
    }
};

const onBtnClick = () => {
    btn.disabled = true;
    checkPromocode(input.value)
        .then((res) => {
            const { status } = res.data;
            paintFrame(status);
        })
        .finally(() => {
            btn.disabled = false;
        })
};

btn.addEventListener('click', onBtnClick);