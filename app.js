const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
  }

  inicializar() {
    btnEmpezar.classList.add("hide");
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(10)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
