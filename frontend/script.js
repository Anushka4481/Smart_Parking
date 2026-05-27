// =========================
// PARK VEHICLE
// =========================

document.getElementById("parkForm").onsubmit = async (e) => {

    e.preventDefault();

    const vehicle =
        document.getElementById("vehicle").value.trim();

    const type =
        document.getElementById("type").value;

    if (!vehicle) {

        document.getElementById("result").innerText =
            "Enter vehicle number";

        return;
    }

    try {

        const res = await fetch(
            "http://localhost:3000/park",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vehicle,
                    type
                })
            }
        );

        const data = await res.text();

        document.getElementById("result").innerText =
            data;

        document.getElementById("parkForm").reset();

        loadDashboard();
        loadSlots();

    } catch (err) {

        document.getElementById("result").innerText =
            "Server Error";
    }
};


// =========================
// EXIT VEHICLE
// =========================

async function exitVehicle() {

    const vehicle =
        document.getElementById("exitVehicle").value.trim();

    if (!vehicle) {

        document.getElementById("result").innerText =
            "Enter vehicle number";

        return;
    }

    try {

        const res = await fetch(
            "http://localhost:3000/exit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vehicle
                })
            }
        );

        const data = await res.json();

        document.getElementById("result").innerText =
            `Vehicle : ${data.vehicle}
Slot : ${data.slot}
Hours : ${data.hours}
Fee : ₹${data.fee}

${data.status}`;

        document.getElementById("exitVehicle").value = "";

        loadDashboard();
        loadSlots();

    } catch (err) {

        document.getElementById("result").innerText =
            "Vehicle Exit Failed";
    }
}


// =========================
// STAFF ROUTE
// =========================

async function getStaffRoute() {

    try {

        const res =
            await fetch("http://localhost:3000/staff");

        const data =
            await res.text();

        document.getElementById("result").innerText =
            data;

    } catch (err) {

        document.getElementById("result").innerText =
            "Error Fetching Staff Route";
    }
}


// =========================
// LOAD DASHBOARD
// =========================

async function loadDashboard() {

    try {

        const res =
            await fetch(
                "http://localhost:3000/dashboard"
            );

        const data =
            await res.json();

        document.getElementById("totalSlots").innerText =
            data.total;

        document.getElementById("availableSlots").innerText =
            data.available;

        document.getElementById("occupiedSlots").innerText =
            data.occupied;

        document.getElementById("revenue").innerText =
            "₹" + data.revenue;

    } catch (err) {

        console.log("Dashboard Error");
    }
}


// =========================
// LOAD SLOT STATUS
// =========================

async function loadSlots() {

    try {

        const res =
            await fetch(
                "http://localhost:3000/slots"
            );

        const slots =
            await res.json();

        slots.forEach(slot => {

            const element =
                document.getElementById(
                    "slot" + slot.id
                );

            if (!element) return;

            if (slot.occupied == 1) {

                element.style.background =
                    "red";

                element.style.color =
                    "white";

            } else {

                element.style.background =
                    "limegreen";

                element.style.color =
                    "white";
            }
        });

    } catch (err) {

        console.log("Slot Loading Error");
    }
}


// =========================
// AUTO REFRESH
// =========================

loadDashboard();
loadSlots();

setInterval(loadDashboard, 5000);

setInterval(loadSlots, 5000);