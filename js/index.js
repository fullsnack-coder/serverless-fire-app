// script que va controlar el index

async function setupUI(user) {
  if (user) {
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
    console.log(0);
    loggedInMenu.forEach((item) => {
      item.style.display = "none";
    });
    loggedOutMenu.forEach((button) => {
      button.style.display = "block";
    });
  }
}
