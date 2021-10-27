export const securityQuestions = {
    questions : [
        { value: '', label: 'Select secutiy question?' },
        { value: 1, label: 'What was your childhood nickname?' },
        { value: 2, label: 'What is the name of your favorite childhood friend?' },
        { value: 3, label: 'What is the middle name of your oldest child?' },
        { value: 4, label: 'What was your favorite sport in high school?' },
        { value: 5, label: 'What was your favorite food as a child?' },
        { value: 6, label: 'What was the make and model of your first car?' },
        { value: 7, label: 'In what town was your first job?' },
        { value: 8, label: 'What was the name of the company where you had your first job?' }
    ]
}

export const onChangeValue = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === 'cusName'|| name === 'city') {
        value = value.replace(/[^a-zA-Z_-]/g,'');
    }
    if (name === 'phone') {
        value = value.replace(/[^0-9_-]/g,'');
    }
    return value;
}

export const emailValidation = (value) => {
    const valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return valid;
}

export const textValidation = (value) => {
    const valid = /^[a-zA-Z]+$/.test(value);
    return valid;
}

export const numberValidation = (value) => {
    const valid = /^[0-9]+$/.test(value);
    return valid;
}

export const emptyValidation = (value, msg) => {
    const valid = value ? '' : msg;
    return valid;
}