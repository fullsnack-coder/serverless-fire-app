signupForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const modal = document.querySelector("#modal-signup");
  try {
    const { email, password } = getSignupFormInfo();
    await login(email, password);
    console.log("user created...");
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
    console.log("user logged...");
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
  console.log("logout...");
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
  return await auth.signOut();
}

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("quotes").onSnapshot((snapshot) => {
      setupQuotes(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
  }
});
