import * as React from 'react'

const faq = {
  title: 'Frequently asked questions',
  // description: '',
  items: [
    {
      q: 'Bagaimana Cara Menggunakan Serba Premium?',
      a: (
        <>
          Anda bisa membuat akun terlebih dahulu, setelah itu anda dapat memilih paket yang
          anda butuhkan, jika sudah lakukan pembayaran sesuai dengan paket yang anda pilih.
           Terakhir download ekstensi yang sudah kami sediakan.
        </>
      ),
    },
    {
      q: 'Bagaimana cara melakukan pembayaran?',
      a: "Untuk sekarang kami hanya dapat menerima metode pembayaran melalui Dana",
    },
    {
      q: 'Apakah saya bisa membagikan akun saya ke teman?',
      a: 'Tidak. Kami menyimpan history anda, jika terdeteksi maka akan kami suspend.',
    },
    {
      q: 'Bagaimana menghubungi Serba Premium?',
      a: 'Anda dapat bergabung dengan Telegram Kami @SerbaPremium0 atau dapat menghubungi melalui Whatsapp',
    },
  ],
}

export default faq
