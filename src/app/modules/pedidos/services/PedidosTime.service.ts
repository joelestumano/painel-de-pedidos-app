function subtractTenMinutes(dateTimeString: string): string {

    const [date, time] = dateTimeString.split(" ");
    const [year, month, day] = date.split("-");
    const [hours, minutes, seconds] = time.split(":");

    const dateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));

    dateTime.setMinutes(dateTime.getMinutes() - 10);

    return `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateTime.getDate().toString().padStart(2, "0")} ${dateTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${dateTime.getMinutes().toString().padStart(2, "0")}:${dateTime
                .getSeconds()
                .toString()
                .padStart(2, "0")}.${dateTime.getMilliseconds()}`;
}

export const PedidosTimeService = {
    subtractTenMinutes
}