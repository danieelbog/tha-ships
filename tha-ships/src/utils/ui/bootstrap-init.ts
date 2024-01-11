import * as bootstrap from 'bootstrap';

export const setBootstrapComponents = () => {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
        new bootstrap.Tooltip(tooltip);
    });

    document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
        new bootstrap.Popover(popover);
    });
};

export const setTooltip = (element: HTMLElement) => {
    new bootstrap.Tooltip(element);
};

export const setPopover = (element: HTMLElement) => {
    new bootstrap.Popover(element);
};
