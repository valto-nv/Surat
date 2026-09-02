const form = document.getElementById("messageForm");
const namaPengirim = document.getElementById("namaPengirim");
const isiPesan = document.getElementById("isiPesan");
const formError = document.getElementById("formError");
const submitButton = form.querySelector('button[type="submit"]');

async function kirimKeTelegram(nama, pesan) {
  const response = await fetch("/.netlify/functions/send-telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nama: nama,
      pesan: pesan
    })
  });

  if (!response.ok) {
    throw new Error("Gagal mengirim pesan.");
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nama = namaPengirim.value.trim();
  const pesan = isiPesan.value.trim();

  if (!nama || !pesan) {
    formError.textContent = "Isi nama dan pesan terlebih dahulu.";
    return;
  }

  formError.textContent = "Mengirim...";
  submitButton.disabled = true;

  try {
    await kirimKeTelegram(nama, pesan);

    form.reset();
    formError.textContent = "Pesan berhasil dikirim ke Telegram!";
  } catch {
    formError.textContent = "Pesan gagal dikirim. Coba lagi nanti.";
  } finally {
    submitButton.disabled = false;
  }
});
