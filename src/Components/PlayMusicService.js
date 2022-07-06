export const updateSeekControlValue = (seekControlElement , updatedValue) => {
    seekControlElement.value = updatedValue;
}


export const updateSeekControlBackGround = (seekControlElement , backgroundColor) => {
    seekControlElement.style.background = `linear-gradient(to right, ${backgroundColor} 0% , ${backgroundColor} ${(seekControlElement.value - seekControlElement.min) / (seekControlElement.max - seekControlElement.min) * 100}% , #fff ${(seekControlElement.value - seekControlElement.min) / (seekControlElement.max - seekControlElement.min) * 100}% , #fff 100%)`;
}

//#05d7f7