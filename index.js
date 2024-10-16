const burguer = document.querySelector(".burguer");
const navlist = document.querySelector(".navlist");
const closeBtn = document.querySelector(".closeBtn");
const links = document.querySelectorAll(".navbar__link");
const resumeBtn = document.querySelector("#resumeBtn");

burguer.addEventListener("click", () => {
    navlist.classList.add("visible");
});

closeBtn.addEventListener("click", () => {
    navlist.classList.remove("visible");
});

links.forEach((link) => {
    link.addEventListener("click", () => {
        navlist.classList.remove("visible");
    });
});

// const contenedor = document.querySelector(".navbar__location");

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;

//             const ubicationDiv = document.createElement("h5");
//             const hourDiv = document.createElement("p");

//             ubicationDiv.id = "ubicacion";
//             contenedor.appendChild(ubicationDiv);

//             fetch(
//                 `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`
//             )
//                 .then((response) => response.json())
//                 .then((data) => {
//                     const ubication = `${data.countryName || "Desc."},
//                         ${data.city || "Desc."}, ${data.locality || "Desc."}`;

//                     ubicationDiv.innerText = `${ubication}`;
//                 });

//             hourDiv.id = "hora";
//             contenedor.appendChild(hourDiv);

//             function mostrarHora() {
//                 const now = new Date();
//                 hourDiv.innerText = `${now.toLocaleTimeString()}`;
//             }

//             setInterval(mostrarHora, 1000);
//             mostrarHora();
//         },
//         () => {
//             // If user doesn't allow geolocalization
//             console.warn("Failed to get user location.");
//         }
//     );
// } else {
//     console.warn("Geolocalization doesn't supported by this browser.");
// }

// Inicializa EmailJS
(function () {
    emailjs.init("6fzMTLSTwSp-QIVDY"); // Reemplaza con tu User ID
})();

document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_w1rqglb", "template_uzwtfvp", this).then(
            function () {
                alert("Mensaje enviado con éxito!");
                document.getElementById("contact-form").reset();
            },
            function (error) {
                alert("Error al enviar el mensaje: " + JSON.stringify(error));
            }
        );
    });

const langBtns = document.querySelectorAll("[data-language]");

const textToChange = document.querySelectorAll("[data-section]");

langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        resumeBtn.download = `MarianoHilarioResume - ${btn.dataset.language.toUpperCase()}.pdf`;
        resumeBtn.href = `/assets/resumes/MarianoHilarioResume - ${btn.dataset.language.toUpperCase()}.pdf`;
        fetch(`../languages/${btn.dataset.language}.json`)
            .then((response) => response.json())
            .then((data) => {
                textToChange.forEach((element) => {
                    const section = element.dataset.section;
                    const value = element.dataset.value;

                    element.innerHTML = data[section][value];
                });
            });
    });
});
