const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const buttonLogin = document.getElementById('login');

const iconEye = document.getElementById('icon-eye');
const alertMessage = document.getElementById('alert');

// saat iconEye diclik 
iconEye.addEventListener('click', (e) => {
  inputPassword.type === 'password' ? inputPassword.type = 'text' : inputPassword.type = 'password';
  inputPassword.type === 'password' ? (iconEye.classList.remove('fa-eye'), iconEye.classList.add('fa-eye-slash')) : (iconEye.classList.remove('fa-eye-slash'), iconEye.classList.add('fa-eye'));
});

class LoginVaidate {
  constructor(email, password) {
    this.errors = [];
    this.email = email;
    this.password = password;
  }

  emailValid() {
    const cekAd = this['email'].indexOf("@");
    const cekDot = this['email'].lastIndexOf(".");
    return cekAd >= 1 && cekDot >= cekAd + 2 ? true : false;
  }

  validasiEmail() {
    if (this.email == '') {
      this.errors.push('Email tidak boleh kosong');
      return true;
    }
    if (!this.emailValid()) {
      this.errors.push('Email tidak Valid');
      return true;
    }
    return false;
  }

  passwordLessThan() {
    const passwordLength = this.password.length;
    return passwordLength > 6 ? true : false;
  }

  passwordNotSpace() {
    const cekSpace = this['password'].indexOf(" ");
    return cekSpace >= 1 ? true : false;
  }

  validasiPassword() {
    if (this.password == '') {
      this.errors.push('Password tidak boleh kosong');
      return true;
    }

    if (!this.passwordLessThan()) {
      this.errors.push('Password harus lebih dari 6 karakter');
      return true;
    }

    if (this.passwordNotSpace()) {
      this.errors.push('Password tidak boleh ada spasi');
      return true;
    }

    return false;
  }

  checkLogin() {
    this.validasiEmail();
    this.validasiPassword();
    if (this.errors.length > 0) {
      return this.errors;
    }

    return [];
  }
}

// saat button diclick
buttonLogin.addEventListener('click', (e) => {
  const validLogin = new LoginVaidate(inputEmail.value, inputPassword.value);
  const errorsLogin = validLogin.checkLogin();

  if (errorsLogin.length > 0) {
    alertMessage.innerHTML = '';

    const stringError = errorMessage(errorsLogin);

    alertMessage.innerHTML = stringError;
  } else {
    alertMessage.innerHTML = '';
    alert('Anda berhasil login');
    inputEmail.value = '';
    inputPassword.value = '';
  }

})

const errorMessage = (erros) => {
  let stringError = '';
  const errorMaps = erros.map((error) => {
    return `<li>${error}</li>`;
  })

  errorMaps.forEach((error) => {
    stringError += error;
  })

  return `<div>
            <ul>
              ${stringError}
            </ul>
          </div>`
}

