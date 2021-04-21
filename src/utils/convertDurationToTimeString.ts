export function convertDurationToTimeString(duration: number) {
    // Math.floor() arredonda o valor para baixo
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2,'0')) // padStart(2, '0') sempre que o retorno for 1 digito ele adiciona um 0 na frente, para ficar 2 numeros
        .join(':'); // contatena com ':'

        return timeString;
}