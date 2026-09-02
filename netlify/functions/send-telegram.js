exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method tidak diizinkan."
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      statusCode: 500,
      body: "Token atau chat ID belum ada di Netlify."
    };
  }

  try {
    const data = JSON.parse(event.body);

    const nama = data.nama;
    const pesan = data.pesan;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `💌 Surat baru dari ${nama}\n\n${pesan}`
        })
      }
    );

    if (!response.ok) {
      throw new Error("Telegram menolak pesan.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Pesan Telegram gagal dikirim."
    };
  }
};