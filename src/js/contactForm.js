const contactBtn = document.querySelector(".contact__button");
const inputs = document.querySelector(".contact__form");
console.log(inputs);

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  Email.send({
    Host: "smtp.mailtrap.io",
    Username: "9e6b63112abf35",
    Password: "1231bec9d3f05b",
    To: "mark.pedong01@gmail.com",
    From: inputs.elements["email"].value,
    Subject: "Contact",
    Body:
      inputs.elements["name"].value +
      "<br>" +
      inputs.elements["email"].value +
      "<br>" +
      inputs.elements["phone"].value +
      "<br>" +
      inputs.elements["message"].value,
  }).then((msg) => {
    alert("The email successfully sent");
  });

  //   Clear Input form
  inputs.elements["name"].value =
    inputs.elements["email"].value =
    inputs.elements["phone"].value =
    inputs.elements["message"].value =
      "";
});
