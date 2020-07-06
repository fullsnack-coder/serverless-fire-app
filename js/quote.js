// codigo para crear las quotes
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await db.collection("quotes").add({
    author: createForm["author"].value,
    message: createForm["message"].value,
  });

  const modal = document.querySelector("modal");
  M.Modal.getInstance(modal).close();
  createForm.reset();
});
