let db;

const request = indexedDB.open("MyDB", 1);

request.onerror = (e) => {
  console.error("Errore apertura DB", e);
};

request.onsuccess = (e) => {
  db = e.target.result;
  mostraDati();
};

request.onupgradeneeded = (e) => {
  db = e.target.result;
  db.createObjectStore("dati", { autoIncrement: true });
};

function salvaDato() {
  const valore = document.getElementById("dataInput").value;
  const tx = db.transaction("dati", "readwrite");
  const store = tx.objectStore("dati");
  store.add(valore);
  tx.oncomplete = mostraDati;
}

function mostraDati() {
  const lista = document.getElementById("datiSalvati");
  lista.innerHTML = "";
  const tx = db.transaction("dati", "readonly");
  const store = tx.objectStore("dati");
  store.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      const li = document.createElement("li");
      li.textContent = cursor.value;
      lista.appendChild(li);
      cursor.continue();
    }
  };
}
