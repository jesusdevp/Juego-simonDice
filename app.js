const nombre = document.getElementById("name");
const nivel = document.getElementById("level");
const tiempo = document.getElementById("time");
const velocidad = document.getElementById("speed");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const btnInfo = document.getElementById("btnInfo");
const ULTIMO_NIVEL = 10;
let timer;

class Juego {
  constructor() {
    this.inicializar();
  }

  inicializar() {
    this.inicializar = this.inicializar.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.actulizarDetalles();
    this.timeSpeed = 350;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  reiniciar() {
    this.inicializar;
  }

  actulizarDetalles() {
    swal({
      title: "¡Simon Says!",
      text: "Enter your name:",
      content: "input",
      button: "Go",
    }).then((name) => {
      if (name) {
        nombre.innerHTML = this.name = name;
      } else {
        nombre.innerHTML = "Anonymous";
      }
      nivel.innerHTML = this.level = 1;
      tiempo.innerHTML = this.counter = 15;
      velocidad.innerHTML = this.speed = 1;
      this.generarSecuencia();
      setTimeout(this.siguienteNivel, 500);
      this.temporizador();
    });
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  temporizador() {
    this.timer = setInterval(() => {
      this.counter--;
      if (this.counter < 0) {
        clearInterval(this.timer);
        this.perdioElJuego();
      } else {
        tiempo.innerText = this.counter;
      }
    }, 1000);
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subLevel = 0;
    nivel.innerHTML = this.level;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  Velocidad() {
    switch (this.level) {
      case 4:
        this.timeSpeed = 250;
        this.speed++;
        break;
      case 6:
        this.timeSpeed = 150;
        this.speed++;
        break;
      case 9:
        this.timeSpeed = 50;
        this.speed++;
        break;
    }
    velocidad.innerHTML = this.speed;
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), this.timeSpeed);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }

  elegirColor(e) {
    const nombreColor = e.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);

    if (numeroColor === this.secuencia[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.eliminarEventosClick();
        if (this.level === ULTIMO_NIVEL + 1) {
          clearInterval(this.timer);
          this.ganoElJuego();
        } else {
          clearInterval(this.timer);
          swal({
            text: `Very Good! Next Level: ${this.level}`,
            icon: "success",
            timer: 2000,
            buttons: false,
          }).then(() => {
            tiempo.innerHTML = this.counter = 15;
            this.Velocidad();
            this.temporizador();
            setTimeout(this.siguienteNivel(), 1500);
          });
        }
      }
    } else {
      this.perdioElJuego();
      clearInterval(this.timer);
    }
  }

  ganoElJuego() {
    swal({
      title: "¡Simon Says!",
      text: `Congratulations ${this.name}, You completed the game`,
      icon: "success",
    }).then(() => {
      this.eliminarEventosClick();
      this.toggleBtnEmpezar();
    });
  }

  perdioElJuego() {
    swal({
      title: "¡Simon Says!",
      text: `You lost ${this.name}, you reached the level ${this.level}. `,
      icon: "error",
      button: "Try again",
    }).then(() => {
      this.eliminarEventosClick();
      this.toggleBtnEmpezar();
    });
  }
}

function gameInfo() {
  swal({
    icon: "info",
    title: "¡Simón Says!",
    text:
      "Instruccions:\n\nMemorize the color sequence, repeat it and finish the game\n\n Good luck!",
  });
}

function empezarJuego() {
  window.juego = new Juego();
}
