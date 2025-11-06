document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".city-card");
  const modalTitle = document.getElementById("detailCityName");
  const modalImg = document.getElementById("images");
  const modalDesc = document.getElementById("detailCityDescription");
  const ilceListesi = document.getElementById("ilceListesi");

  //  Şehir - İlçe verileri
  const ilceler = {
    "Muğla": ["Bodrum", "Marmaris", "Fethiye", "Datça", "Köyceğiz",],
    "Burdur": ["Ağlasun", "Yeşilova", "Gölhisar", "Bucak"],
    "Isparta": ["Eğirdir", "Yalvaç", "Keçiborlu", "Gelendost"],
    "Antalya": ["Alanya", "Kaş", "Kemer", "Manavgat"],
    "Denizli": ["Pamukkale", "Çivril", "Tavas", "Honaz"],
    "Mersin": ["Tarsus", "Silifke", "Anamur", "Erdemli"],
    "Mardin": ["Midyat", "Nusaybin", "Kızıltepe", "Savur"],
    "Urfa": ["Viranşehir", "Birecik", "Halfeti", "Siverek"],
    "Van": ["Edremit", "Erciş", "Gevaş", "Muradiye"],
    "Aydın": ["Kuşadası", "Söke", "Didim", "Nazilli"]
  };

  //  Her kart tıklanınca modal doldur
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const city = card.dataset.city;
      const img = card.querySelector("img").src;
      const desc = card.querySelector(".card-text").textContent;

      modalTitle.textContent = city;
      modalImg.src = img;
      modalDesc.textContent = desc;

      // İlçe listesini doldur
      ilceListesi.innerHTML = "";
      if (ilceler[city]) {
        ilceler[city].forEach(ilce => {
          const li = document.createElement("li");
          li.textContent = ilce;
          ilceListesi.appendChild(li);
        });
      }
    });
  });
});
