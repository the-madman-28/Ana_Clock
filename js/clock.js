/* =========================================================
   ELEMENTS
========================================================= */

const canvas = document.getElementById("clock");

const ctx = canvas.getContext("2d");

const digitalClock =
    document.getElementById("digitalClock");

const dateElement =
    document.getElementById("date");


/* =========================================================
   CLOCK CONFIGURATION
========================================================= */

const center = canvas.width / 2;

const radius =
    canvas.height / 2 * 0.88;


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawClock();

    requestAnimationFrame(animate);
}


/* =========================================================
   DRAW CLOCK
========================================================= */

function drawClock() {

    drawFace();

    drawTicks();

    drawNumbers();

    drawTime();

    drawCenter();
}


/* =========================================================
   CLOCK FACE
========================================================= */

function drawFace() {

    /* Outer glow */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius + 5,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(56, 189, 248, 0.25)";

    ctx.lineWidth = 10;

    ctx.shadowColor = "#38bdf8";

    ctx.shadowBlur = 25;

    ctx.stroke();

    ctx.shadowBlur = 0;


    /* Main dial */

    const gradient =
        ctx.createRadialGradient(
            center,
            center,
            radius * 0.05,
            center,
            center,
            radius
        );

    gradient.addColorStop(
        0,
        "#172554"
    );

    gradient.addColorStop(
        0.55,
        "#0f172a"
    );

    gradient.addColorStop(
        1,
        "#020617"
    );


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = gradient;

    ctx.fill();


    /* Outer ring */

    const ringGradient =
        ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

    ringGradient.addColorStop(
        0,
        "#38bdf8"
    );

    ringGradient.addColorStop(
        0.5,
        "#2563eb"
    );

    ringGradient.addColorStop(
        1,
        "#7dd3fc"
    );


    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        ringGradient;

    ctx.lineWidth = 5;

    ctx.stroke();


    /* Inner ring */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        radius * 0.91,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(148, 163, 184, 0.18)";

    ctx.lineWidth = 1;

    ctx.stroke();
}


/* =========================================================
   TICK MARKS
========================================================= */

function drawTicks() {

    for (let i = 0; i < 60; i++) {

        const angle =
            i * Math.PI / 30;

        const isHour =
            i % 5 === 0;

        const outer =
            radius * 0.86;

        const inner =
            isHour
                ? radius * 0.78
                : radius * 0.82;


        const x1 =
            center +
            Math.cos(angle) * inner;

        const y1 =
            center +
            Math.sin(angle) * inner;

        const x2 =
            center +
            Math.cos(angle) * outer;

        const y2 =
            center +
            Math.sin(angle) * outer;


        ctx.beginPath();

        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);


        ctx.strokeStyle =
            isHour
                ? "#7dd3fc"
                : "rgba(148, 163, 184, 0.35)";


        ctx.lineWidth =
            isHour ? 3 : 1;

        ctx.lineCap = "round";

        ctx.stroke();
    }
}


/* =========================================================
   CLOCK NUMBERS
========================================================= */

function drawNumbers() {

    ctx.save();

    ctx.font =
        `600 ${radius * 0.13}px Segoe UI`;

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillStyle = "#e0f2fe";

    ctx.shadowColor = "#38bdf8";

    ctx.shadowBlur = 8;


    for (
        let number = 1;
        number <= 12;
        number++
    ) {

        const angle =
            number * Math.PI / 6 -
            Math.PI / 2;


        const x =
            center +
            Math.cos(angle) *
            radius * 0.68;


        const y =
            center +
            Math.sin(angle) *
            radius * 0.68;


        ctx.fillText(
            number,
            x,
            y
        );
    }


    ctx.restore();
}


/* =========================================================
   TIME
========================================================= */

function drawTime() {

    const now = new Date();


    const hours =
        now.getHours() % 12;

    const minutes =
        now.getMinutes();

    const seconds =
        now.getSeconds();

    const milliseconds =
        now.getMilliseconds();


    /* Smooth seconds */

    const smoothSeconds =
        seconds +
        milliseconds / 1000;


    /* Hour hand */

    const hourAngle =
        (hours * Math.PI / 6) +
        (minutes * Math.PI / 360) +
        (smoothSeconds * Math.PI / 21600);


    /* Minute hand */

    const minuteAngle =
        (minutes * Math.PI / 30) +
        (smoothSeconds * Math.PI / 1800);


    /* Second hand */

    const secondAngle =
        smoothSeconds * Math.PI / 30;


    drawHand(
        hourAngle,
        radius * 0.48,
        10,
        "#e0f2fe"
    );


    drawHand(
        minuteAngle,
        radius * 0.67,
        7,
        "#bae6fd"
    );


    drawHand(
        secondAngle,
        radius * 0.75,
        2,
        "#38bdf8"
    );


    drawSecondCounterweight(
        secondAngle
    );
}


/* =========================================================
   CLOCK HAND
========================================================= */

function drawHand(
    angle,
    length,
    width,
    color
) {

    const endX =
        center +
        Math.cos(
            angle - Math.PI / 2
        ) * length;


    const endY =
        center +
        Math.sin(
            angle - Math.PI / 2
        ) * length;


    ctx.beginPath();

    ctx.moveTo(
        center,
        center
    );

    ctx.lineTo(
        endX,
        endY
    );


    ctx.strokeStyle = color;

    ctx.lineWidth = width;

    ctx.lineCap = "round";

    ctx.shadowColor = color;

    ctx.shadowBlur = 12;

    ctx.stroke();

    ctx.shadowBlur = 0;
}


/* =========================================================
   SECOND HAND COUNTERWEIGHT
========================================================= */

function drawSecondCounterweight(angle) {

    const length =
        radius * 0.18;


    const x =
        center -
        Math.cos(
            angle - Math.PI / 2
        ) * length;


    const y =
        center -
        Math.sin(
            angle - Math.PI / 2
        ) * length;


    ctx.beginPath();

    ctx.moveTo(
        center,
        center
    );

    ctx.lineTo(
        x,
        y
    );


    ctx.strokeStyle =
        "#38bdf8";

    ctx.lineWidth = 2;

    ctx.stroke();
}


/* =========================================================
   CENTER HUB
========================================================= */

function drawCenter() {

    /* Outer glow */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        13,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(56, 189, 248, 0.25)";

    ctx.shadowColor =
        "#38bdf8";

    ctx.shadowBlur = 18;

    ctx.fill();


    /* Center dot */

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        6,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#e0f2fe";

    ctx.shadowBlur = 0;

    ctx.fill();
}


/* =========================================================
   DIGITAL CLOCK
========================================================= */

function updateDigitalClock() {

    const now = new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    digitalClock.textContent =
        `${hours}:${minutes}:${seconds}`;


    dateElement.textContent =
        now.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
}


/* =========================================================
   START DIGITAL CLOCK
========================================================= */

updateDigitalClock();

setInterval(
    updateDigitalClock,
    250
);


/* =========================================================
   START ANALOG CLOCK
========================================================= */

animate();
