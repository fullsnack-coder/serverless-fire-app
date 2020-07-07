signupForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const modal = document.querySelector("#modal-signup");
  try {
    const { email, password } = getSignupFormInfo();
    await login(email, password);
  } catch (error) {
    console.log({ error });
  } finally {
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  }
});

loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const modal = document.querySelector("#modal-signup");
  try {
    const { email, password } = getLoginFormInfo();
    await login(email, password);
  } catch (error) {
    console.log({ error });
  } finally {
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }
});

logoutButton.addEventListener("click", async (evt) => {
  evt.preventDefault();
  await logout();
});

function getSignupFormInfo() {
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  return { email, password };
}

function getLoginFormInfo() {
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  return { email, password };
}

async function signup(email, password) {
  const credentials = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  return db.collection("users").doc(credentials.user.uid).set({
    bio: signupForm["signup-bio"].value,
  });
}

async function login(email, password) {
  return await auth.signInWithEmailAndPassword(email, password);
}

async function logout() {
  await auth.signOut();
  window.location.reload();
}

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    user.admin = idTokenResult.claims.admin;
    db.collection("quotes").onSnapshot((snapshot) => {
      setupQuotes(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupQuotes([]);
    setupUI();
  }
});
