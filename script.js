/* =========================
   FOTO MENGAMBANG
========================= */

const fotoList = document.querySelectorAll(".floating-photo");


function pindahRandom(foto) {

    const lebarFoto = foto.offsetWidth;
    const tinggiFoto = foto.offsetHeight;

    const maxX =
        window.innerWidth - lebarFoto;

    const maxY =
        window.innerHeight - tinggiFoto;

    const randomX =
        Math.max(
            0,
            Math.random() * maxX
        );

    const randomY =
        Math.max(
            0,
            Math.random() * maxY
        );

    foto.style.left =
        randomX + "px";

    foto.style.top =
        randomY + "px";

    foto.style.right = "auto";
    foto.style.bottom = "auto";
}


/* Event foto */

fotoList.forEach(function (foto) {

    foto.addEventListener(
        "mouseenter",
        function () {
            pindahRandom(foto);
        }
    );


    foto.addEventListener(
        "click",
        function () {
            pindahRandom(foto);
        }
    );


    foto.addEventListener(
        "touchstart",
        function () {
            pindahRandom(foto);
        },
        {
            passive: true
        }
    );

});


/* =========================
   FORM TELEGRAM
========================= */

const form =
    document.getElementById("messageForm");


if (form) {

    const namaPengirim =
        document.getElementById("namaPengirim");

    const isiPesan =
        document.getElementById("isiPesan");

    const formError =
        document.getElementById("formError");

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    async function kirimKeTelegram(
        nama,
        pesan
    ) {

        const response = await fetch(
            "/.netlify/functions/send-telegram",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    nama: nama,
                    pesan: pesan
                })
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mengirim pesan.");
        }

    }


    form.addEventListener(
        "submit",
        async function (event) {event.preventDefault();
            const nama = namaPengirim.value.trim();
            const pesan = isiPesan.value.trim();

            if (!nama || !pesan) {
                formError.textContent = "Isi nama dan pesan terlebih dahulu.";
                return;
            }

            formError.textContent ="Mengirim...";
            submitButton.disabled = true;

            try {
                await kirimKeTelegram(nama,pesan);
                form.reset();
                formError.textContent = "💌 Pesan berhasil dikirim!";
            } catch (error) {
                formError.textContent =
                    "Pesan gagal dikirim. Coba lagi nanti.";
            } finally {
                submitButton.disabled = false;
            }

        }
    );

}
