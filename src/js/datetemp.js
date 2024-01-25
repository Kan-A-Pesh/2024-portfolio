(async () => {
    // Date
    const datetempEl = document.querySelector("#DATE_AND_TEMP");

    const dateUrl = "https://worldtimeapi.org/api/timezone/Europe/Paris";
    const request = await fetch(dateUrl);
    const dateData = await request.json();

    const date = new Date(dateData.datetime);

    const f = (n) => (n < 10 ? `0${n}` : n);

    // Temperature
    const tempUrl =
        "https://api.open-meteo.com/v1/forecast?latitude=48.866667&longitude=2.333333&hourly=temperature_2m&timezone=Europe%2FLondon&forecast_days=1";
    const tempData = await (await fetch(tempUrl)).json();

    // Average temperature
    const temps = tempData.hourly.temperature_2m;
    const temp = Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 100) / 100;

    const refresh = () => {
        date.setSeconds(date.getSeconds() + 1);
        datetempEl.innerHTML =
            f(date.getHours()) + ":" + f(date.getMinutes()) + ":" + f(date.getSeconds()) + " " + dateData.abbreviation + " " + temp + "°C";
    };

    // Refresh
    setInterval(refresh, 1000);
    refresh();
})();
