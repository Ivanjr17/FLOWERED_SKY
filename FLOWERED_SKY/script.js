// --- 1. DECLARACIÓN DE VARIABLES ---
const pantallaInicio = document.getElementById('pantallaInicio');
const btnEntrar = document.getElementById('btnEntrar');
const btnSalir = document.getElementById('btnSalir');
const zonaBotones = document.getElementById('zonaBotones');
const musicaFondo = document.getElementById('musicaFondo');
const tarjeta = document.getElementById('tarjeta');
const contenedorHuellas = document.getElementById('contenedorHuellas');

const btnExplorar = document.getElementById('btnExplorar');
const contenedorEstrellas = document.getElementById('contenedorEstrellas');
const modalMensaje = document.getElementById('modalMensaje');
const textoModal = document.getElementById('textoModal');
const imagenModal = document.getElementById('imagenModal');
const cerrarModal = document.getElementById('cerrarModal');

// --- 2. LISTADO OFICIAL DE LOS 21 MENSAJES PARA LAS ESTRELLAS ---
const listaMensajes = [
    "Gracias por aparecer en mi vida, por haber sido parte de ella!",
    "Existen personas en este mundo que son irrepetibles y se suelen recordar con una canción!",
    "Corriendo sin prisa, puedes encontrar a quién no esperabas encontrar pero necesitabas!",
    "No encontré palabras en todo este tiempo para poder explicarte lo que generas en mí!",
    "Creo que serás aquel amor que me costará olvidar por mucho tiempo!",
    "Siempre fuiste tú, y siempre lo serás!",
    "Eres mi Andrómeda, eres anestesia!🌙",
    "Eres mi inspiración y a la vez eres su ausencia!",
    "Jamás esperé algo bonito por parte de alguien y mucho menos de la vida, tanto que, cuando llegaste, no supe como cuidarte",
    "Brillarás en todos lados en donde vayas!",
    "Continúa siendo fuerte ante las adversidades!",
    "No todo tiene que ser color de rosa, la oscuridad también tiene sus partes bellas!",
    "Jamás dejes de sonreírle a la vida, tienes unos oyuelos que hasta la luna te envidia❣️",
    "Llorar no es malo, malo es no permitirte hacerlo!",
    "Nunca estarás sola, siempre estaré en el baúl de tus recuerdos olvidados, pero estaré!",
    "No permitas que te lastimen, eres mucho y lo sabes❣️",
    "Tengo promesas que te hice y que aún no he cumplido",
    "Eres capaz de hacer lo que te propones❣️",
    "No dejes de mirar al cielo por las noches, porque todas las noches te busco entre las estrellas✨",
    "Eres el motivo de mis desvelos y yo que soy nictofilo✨",
    "El tacto de tus manos es capaz de dar tranquilidad a mi alma, y en un parpadeo, agita mi corazón, recordándome que sostienes el hilo absoluto de mi destino🌙"
];

// --- 3. GENERADOR DE HUELLAS DE PERRITO ANIMADAS (SILUETA REAL) ---
function crearHuella() {
    if (pantallaInicio.classList.contains('oculto')) return;

    const huella = document.createElement('div');
    huella.classList.add('huellita');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const rotacion = Math.random() * 360;

    huella.style.left = `${x}px`;
    huella.style.top = `${y}px`;
    huella.style.transform = `rotate(${rotacion}deg)`;

    huella.innerHTML = `
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="#f472b6" style="width:100%; height:100%; opacity:0.6;">
            <path d="M12,12.5 C10.2,12.5 8.5,13.8 8.5,16 C8.5,18.5 10,20 12,20 C14,20 15.5,18.5 15.5,16 C15.5,13.8 13.8,12.5 12,12.5 Z" />
            <ellipse cx="5.5" cy="11.5" rx="1.8" ry="2.3" transform="rotate(-30 5.5 11.5)" />
            <ellipse cx="9.2" cy="7.8" rx="1.8" ry="2.5" transform="rotate(-10 9.2 7.8)" />
            <ellipse cx="14.8" cy="7.8" rx="1.8" ry="2.5" transform="rotate(10 14.8 7.8)" />
            <ellipse cx="18.5" cy="11.5" rx="1.8" ry="2.3" transform="rotate(30 18.5 11.5)" />
        </svg>
    `;

    contenedorHuellas.appendChild(huella);

    setTimeout(() => {
        huella.remove();
    }, 3000);
}

const intervaloHuellas = setInterval(crearHuella, 400);

// --- 4. CONTROLADOR INTERACTIVO HÍBRIDO (CLICK Y DISPOSITIVOS MÓVILES) ---
function agregarEventoInteractivo(elemento, accion) {
    elemento.addEventListener('click', (e) => {
        e.preventDefault();
        accion();
    });
    elemento.addEventListener('touchstart', (e) => {
        e.preventDefault();
        accion();
    }, { passive: false });
}

// --- 5. TRANSICIÓN DE PANTALLAS ---
agregarEventoInteractivo(btnEntrar, () => {
    clearInterval(intervaloHuellas);
    pantallaInicio.classList.add('oculto');
    
    setTimeout(() => {
        tarjeta.classList.add('mostrar');
    }, 500);
    
    musicaFondo.play().catch(e => console.log("Audio pausado por el navegador:", e));
    initGalaxia();
    generarEstrellasMensajes();
    configurarClicFlores();
});

// --- 6. BOTÓN EVASIVO ---
btnSalir.addEventListener('mouseenter', moverBotonNo);
btnSalir.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moverBotonNo();
}, { passive: false });

function moverBotonNo() {
    const limiteX = zonaBotones.clientWidth - btnSalir.clientWidth;
    const limiteY = zonaBotones.clientHeight - btnSalir.clientHeight;
    
    btnSalir.style.left = `${Math.random() * limiteX}px`;
    btnSalir.style.top = `${Math.random() * limiteY}px`;
}

// --- 7. MODO EXPLORAR EL CIELO ---
agregarEventoInteractivo(btnExplorar, () => {
    tarjeta.classList.add('ocultar-completo');
});

// --- 8. VENTANA EMERGENTE (MODAL) ---
function abrirModal(tipo, contenido) {
    if (tipo === 'texto') {
        textoModal.style.display = "block";
        imagenModal.style.display = "none";
        textoModal.textContent = `"${contenido}"`;
    } else if (tipo === 'imagen') {
        textoModal.style.display = "none";
        imagenModal.style.display = "block";
        imagenModal.src = contenido;
    }
    modalMensaje.classList.add('activo');
}

agregarEventoInteractivo(cerrarModal, () => {
    modalMensaje.classList.remove('activo');
});

modalMensaje.addEventListener('click', (e) => {
    if (e.target === modalMensaje) {
        modalMensaje.classList.remove('activo');
    }
});
modalMensaje.addEventListener('touchstart', (e) => {
    if (e.target === modalMensaje) {
        e.preventDefault();
        modalMensaje.classList.remove('activo');
    }
}, { passive: false });

// --- 9. ENLACE DE LAS FOTOS A LAS FLORES (.JPEG) ---
function configurarClicFlores() {
    for (let i = 1; i <= 5; i++) {
        const flor = document.getElementById(`flor${i}`);
        if (flor) {
            agregarEventoInteractivo(flor, () => {
                abrirModal('imagen', `flor${i}.jpeg`);
            });
        }
    }
}

// --- 10. GENERADOR DE LAS 21 ESTRELLAS CONSTELADAS ---
function generarEstrellasMensajes() {
    listaMensajes.forEach((mensaje, index) => {
        const estrella = document.createElement('div');
        estrella.classList.add('estrella-clic');

        const x = Math.random() * 90 + 5; 
        const y = Math.random() * 55 + 10; 

        estrella.style.left = `${x}%`;
        estrella.style.top = `${y}%`;
        estrella.style.animationDelay = `${Math.random() * 2}s`;

        agregarEventoInteractivo(estrella, () => {
            abrirModal('texto', mensaje);
        });

        contenedorEstrellas.appendChild(estrella);
    });
}

// --- 11. MOTOR GRÁFICO CÓSMICO (CANVAS ANIMATION) ---
function initGalaxia() {
    const canvas = document.getElementById('skyCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const estrellas = [];
    for (let i = 0; i < 220; i++) {
        estrellas.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            color: `hsl(${Math.random() * 50 + 250}, 85%, 85%)`
        });
    }

    let estrellaFugaz = null;

    function crearEstrellaFugaz() {
        estrellaFugaz = {
            x: Math.random() * width,
            y: Math.random() * (height / 2),
            largo: Math.random() * 80 + 40,
            velocidadX: Math.random() * 15 + 10,
            velocidadY: Math.random() * 4 + 2,
            opacidad: 1
        };
    }

    function renderLoop() {
        ctx.fillStyle = 'rgba(8, 7, 16, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2);

        estrellas.forEach(e => {
            e.z -= 1.5;
            if (e.z <= 0) {
                e.z = width;
                e.x = Math.random() * width - width / 2;
                e.y = Math.random() * height - height / 2;
            }

            const px = (e.x / e.z) * width;
            const py = (e.y / e.z) * height;
            const t = ((width - e.z) / width) * 3;

            ctx.beginPath();
            ctx.arc(px, py, t, 0, Math.PI * 2);
            ctx.fillStyle = e.color;
            ctx.fill();
        });
        ctx.restore();

        if (!estrellaFugaz && Math.random() < 0.008) {
            crearEstrellaFugaz();
        }

        if (estrellaFugaz) {
            ctx.beginPath();
            const gradiente = ctx.createLinearGradient(
                estrellaFugaz.x, estrellaFugaz.y, 
                estrellaFugaz.x - estrellaFugaz.largo, estrellaFugaz.y - (estrellaFugaz.velocidadY * 2)
            );
            gradiente.addColorStop(0, `rgba(255, 255, 255, ${estrellaFugaz.opacidad})`);
            gradiente.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradiente;
            ctx.lineWidth = 2;
            ctx.moveTo(estrellaFugaz.x, estrellaFugaz.y);
            ctx.lineTo(estrellaFugaz.x - estrellaFugaz.largo, estrellaFugaz.y - (estrellaFugaz.velocidadY * 2));
            ctx.stroke();

            estrellaFugaz.x += estrellaFugaz.velocidadX;
            estrellaFugaz.y += estrellaFugaz.velocidadY;
            estrellaFugaz.opacidad -= 0.015;

            if (estrellaFugaz.x > width || estrellaFugaz.opacidad <= 0) {
                estrellaFugaz = null;
            }
        }

        requestAnimationFrame(renderLoop);
    }
    renderLoop();
}
