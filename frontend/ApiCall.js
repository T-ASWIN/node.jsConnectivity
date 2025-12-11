async function loadData() {
  try {
    const result = await fetch("http://localhost:4000/students");
    const data = await result.json();

    const tableDiv = document.getElementById("table");

    const rows = data
      .map(
        (val) => `
        <tr>
          <td>${val.id}</td>
          <td>${val.tamil}</td>
          <td>${val.english}</td>
          <td>${val.maths}</td>
          <td>${val.science}</td>
          <td>${val.social}</td>
          <td><button onClick="handledelete(${val.id})">Delete</button></td>
        </tr>`
      )
      .join("");

    tableDiv.innerHTML = `
      <table border="1" cellpadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tamil</th>
            <th>English</th>
            <th>Maths</th>
            <th>Science</th>
            <th>Social</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.log(err);
  }
}
async function handledelete(id) {
  try {
    const res = await fetch("http://localhost:4000/delete", {
      method: "delete",
    });
    const data = res.json();
  } catch (err) {
    console.log(err);
  }
}
loadData();

const form = document.getElementById("formtotal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const tamil = document.getElementById("tamil").value;
  const english = document.getElementById("english").value;
  const maths = document.getElementById("maths").value;
  const science = document.getElementById("science").value;
  const social = document.getElementById("social").value;

  try {
    const res = await fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        tamil,
        english,
        maths,
        science,
        social,
      }),
    });

    const msg = await res.json();
    alert(msg.message);

    loadData();

    form.reset();
  } catch (err) {
    console.log("Insert error:", err);
  }
});
