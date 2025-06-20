var btnSign = document.getElementById("btnSign");
var btnSignin = document.getElementById("btnSignin");
var btnLogout = document.getElementById("btnLogout");
var btnLogin = document.getElementById("btnLogin");
var btnSignUp = document.getElementById("btnSignUp");
var loginForm = document.getElementById("loginForm");
var singupForm = document.getElementById("signupForm");
var inputName = document.getElementById("name");
var inputPassSign = document.getElementById("password-sign");
var inputEmailSign = document.getElementById("email-sign");
var inputEmailLogin = document.getElementById("email-login");
var inputPassLogin = document.getElementById("password-login");

var home = document.getElementById("home");
var person = {
  name: "",
  email: "",
  password: "",
};

var persons = JSON.parse(localStorage.getItem("personData")) || [];
btnLogin.addEventListener("click", function () {
  if (!inputEmailLogin.value || !inputPassLogin.value) {
    document.getElementById("loginError").innerHTML =
      "<p class='text-danger'>All fields are required.</p>";
    return;
  }
  const matchedPerson = persons.find(
    (p) =>
      p.email === inputEmailLogin.value.trim() &&
      p.password === inputPassLogin.value
  );

  if (matchedPerson) {
    home.classList.remove("d-none");

    loginForm.classList.add("d-none");

    document.getElementById("userName").textContent = matchedPerson.name;
    document.getElementById("loginError").innerHTML = null;
    document.getElementById("loginError").innerHTML = null;
  } else {
    document.getElementById("loginError").innerHTML =
      "<p class='text-danger'>incorrect email or password</p>";
  }
  inputEmailLogin.value = null;
  inputPassLogin.value = null;
});

btnSignUp.addEventListener("click", function () {
  person = {
    name: inputName.value.trim(),
    email: inputEmailSign.value.trim(),
    password: inputPassSign.value,
  };

  if (!inputEmailSign.value || !inputPassSign.value || !inputName.value) {
    document.getElementById("error").innerHTML =
      "<p class='text-danger'>All fields are required.</p>";
    return;
  }
  if (!isValidEmail(person.email)) {
    document.getElementById("error").innerHTML =
      "<p class='text-danger'>Please enter a valid email.</p>";
    return;
  }

  if (!isValidPassword(person.password)) {
    document.getElementById("error").innerHTML =
      "<p class='text-danger'>Password must be at least 4 characters.</p>";
    return;
  }

  const emailExists = persons.some((p) => p.email === person.email);

  if (emailExists) {
    document.getElementById("error").innerHTML =
      "<p class='text-danger'>Email already exists</p>";
  } else {
    persons.push(person);
    localStorage.setItem("personData", JSON.stringify(persons));
    document.getElementById("error").innerHTML =
      "<p class='text-success'>Success</p>";
  }
});

btnSign.addEventListener("click", function () {
  singupForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
});
btnSignin.addEventListener("click", function () {
  loginForm.classList.remove("d-none");
  singupForm.classList.add("d-none");
  console.log("hello");
});
btnLogout.addEventListener("click", function () {
  loginForm.classList.remove("d-none");
  home.classList.add("d-none");
});
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 4;
}
