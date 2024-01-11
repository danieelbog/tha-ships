export const setContainerHeight = (contentContainer: HTMLElement) => {
    const windowHeight = window.innerHeight;

    if (windowHeight <= 667) {
        contentContainer.style.height = '51vh';
    } else if (windowHeight <= 740) {
        contentContainer.style.height = '56vh';
    } else if (windowHeight <= 914) {
        contentContainer.style.height = '62vh';
    } else if (windowHeight <= 932) {
        contentContainer.style.height = '65vh';
    } else {
        contentContainer.style.height = '80vh';
    }
};
