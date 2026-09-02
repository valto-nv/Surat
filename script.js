const form = document.getElementById("whatsappForm");
const isiPesan = document.getElementById("isiPesan");
const formError = document.getElementById("formError");

// Ganti dengan nomor WhatsApp kamu.
// Gunakan format kode negara: 628123456789
const nomorTujuan = "6288271601633";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const pesan = isiPesan.value.trim();

  if (!pesan) {
    formError.textContent = "Tulis pesanmu terlebih dahulu.";
    isiPesan.focus();
    return;
  }

  formError.textContent = "";

  const whatsappUrl =
    `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`;

  window.location.href = whatsappUrl;
});