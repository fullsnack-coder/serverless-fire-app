adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#admin-email").value;
  const addAnAdmin = functions.httpsCallable("addAdminRole");
  addAnAdmin({ email })
    .then((res) => {
      console.log(res);
    })
    .catch(console.log);
});
