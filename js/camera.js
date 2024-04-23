

const botonAbrirCamara = document.querySelector("[data-video-boton]");
const video = document.querySelector("[data-video]");
const campoCamara = document.querySelector("[data-camera]");

const botonTomarFoto = document.querySelector("[data-tomar-foto]");
const mensaje = document.querySelector("[data-mensaje]");
const canvas = document.querySelector("[data-video-canvas]");

const botonEnviar = document.querySelector("[data-enviar]");
let imgUrl = ""

//async porque el navegador debe esperar que el usuario acepte
// y permita el uso de la camara
botonAbrirCamara.addEventListener("click", async () => {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

    botonAbrirCamara.style.display = "none";//oculta boton de qr
    campoCamara.style.display = "block"; //abre la camara
    video.srcObject = iniciarVideo;//inicia video

})

botonTomarFoto.addEventListener("click", () => {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    imgUrl = canvas.toDataURL("image/jpeg");
    campoCamara.style.display = "none"
    mensaje.style.display = "block"

})

botonEnviar.addEventListener("click", () => {
    const recibirDatos = localStorage.getItem("registro");
    const convertirDatos = JSON.parse(recibirDatos);
    convertirDatos.img_url = imgUrl;

    localStorage.setItem("registro", JSON.stringify(convertirDatos));

    window.location.href = "./abrir-cuenta-form-3.html";
})