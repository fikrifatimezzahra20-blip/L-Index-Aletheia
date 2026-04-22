const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");

const container = document.getElementById("cardsContainer");
const gallery = document.getElementById("gallery");


input.addEventListener("input", () => {

  if (input.value.length === 0) {
    button.disabled = true;
    errorMsg.textContent = "";

  } else if (input.value.length < 3) {
    button.disabled = true;
    errorMsg.textContent = "Thinking requires more precision";

  } else {
    button.disabled = false;
    errorMsg.textContent = "";
  }

});


form.addEventListener("submit", (e) => {

  e.preventDefault(); // ❗

  const query = input.value.toLowerCase(); 

  fetch("https://dummyjson.com/quotes")

    .then(res => res.json())

    .then(data => {

      container.innerHTML = ""; 

      const quotes = data.quotes;

      const filtered = quotes.filter(item =>

        item.quote.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)

      );

      if (filtered.length === 0) {

        container.innerHTML = `
          <p class="empty-msg">
            This truth does not exist in this possible world.
          </p>
        `;

        gallery.style.display = "block";
        return;
      }

      filtered.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <p>"${item.quote}"</p>
          <span>- ${item.author}</span>
        `;

        container.appendChild(card);

      });

      gallery.style.display = "block";

    })

    .catch(error => {

      console.log(error);

      container.innerHTML = "Error fetching data.";
      gallery.style.display = "block";

    });

});