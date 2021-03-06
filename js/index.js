// script que va controlar el index

async function setupUI(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach((i) => {
        i.style.display = "block";
      });
    }
    const userCollection = (
      await db.collection("users").doc(user.uid).get()
    ).data();

    const html = `<div><strong>Logged In as <i>${user.email}</i></strong></div>
                    <div><strong>Profile: ${userCollection.bio}</strong></div>
                `;
    accountDetails.innerHTML = html;
    loggedInMenu.forEach((item) => {
      item.style.display = "block";
    });
    loggedOutMenu.forEach((button) => {
      button.style.display = "none";
    });
  } else {
    quotesUI.innerHTML += `<h2>Login to enjoy</h2>`;
    loggedInMenu.forEach((item) => {
      item.style.display = "none";
    });
    loggedOutMenu.forEach((button) => {
      button.style.display = "block";
    });
    adminItems.forEach((item) => {
      item.style.display = "none";
    });
  }
}

async function setupQuotes(quotes) {
  let html = ``;
  quotes.forEach((doc) => {
    const quote = doc.data();
    const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${quote.author}</div>
              <div class="collapsible-body white lighten-4">${quote.message}</div> </li>`;
    html += li;
  });
  quotesUI.innerHTML = html;
}
