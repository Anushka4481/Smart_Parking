// PARK VEHICLE
document.getElementById("parkForm").onsubmit = async (e) => {
    e.preventDefault();

    const vehicle = document.getElementById("vehicle").value.trim();
    const type = document.getElementById("type").value;

    if (!vehicle) {
        document.getElementById("result").innerText = "Enter vehicle number";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/park", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type, vehicle })
        });

        const data = await res.text();
        document.getElementById("result").innerText = data;

    } catch (err) {
        document.getElementById("result").innerText = "Server error";
    }
};

// STAFF ROUTE
async function getStaffRoute() {
    try {
        const res = await fetch("http://localhost:3000/staff");
        const data = await res.text();

        document.getElementById("result").innerText = data;

    } catch (err) {
        document.getElementById("result").innerText = "Error fetching staff route";
    }
}