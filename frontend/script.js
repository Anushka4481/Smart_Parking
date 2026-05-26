async function park() {
    const vehicle = document.getElementById("vehicle").value;
    const type = document.getElementById("type").value;

    const res = await fetch("http://localhost:3000/park", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle, type })
    });

    const data = await res.text();
    document.getElementById("result").innerText = data;
}

async function staff() {
    const res = await fetch("http://localhost:3000/staff");
    const data = await res.text();
    document.getElementById("result").innerText = data;
}