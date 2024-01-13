export const generateColorBasedOnTimeUtc = (receivedTimeUtc: string): string => {
    const timestamp = new Date(receivedTimeUtc).getTime();
    const hue = (timestamp % 3600000) / 3600000; // Get hue value between 0 and 1 for an hour cycle
    const saturation = 0.8; // You can adjust saturation and lightness as needed
    const lightness = 0.5;

    const color = `hsl(${hue * 360}, ${saturation * 100}%, ${lightness * 100}%)`;
    return color;
};
