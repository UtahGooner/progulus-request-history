export const durationToMS = (duration:string|number) => {
    const d = Math.floor((+duration) / 1000);
    const minutes = Math.floor(d / 60);
    const seconds = d - (minutes * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
