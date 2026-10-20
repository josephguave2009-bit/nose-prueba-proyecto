const guides = [
 { title:'Sobrevive tu primera noche', icon:'🌲', category:'Inicio', description:'De las manos vacías a un refugio seguro. Tu mundo empieza aquí.', tips:['Consigue troncos, fabrica tablones y una mesa de trabajo. Haz un pico de madera y úsalo para extraer piedra; cambia pronto a herramientas de piedra.','Reúne comida y carbón. Si no encuentras carbón, funde troncos con combustible en un horno para obtener carbón vegetal y fabricar antorchas.','Construye un refugio iluminado antes de la noche. Una cama requiere tres bloques de lana del mismo color y tres tablones; duerme cuando sea seguro.','No ataques todo lo que veas. Guarda tus objetos valiosos en un cofre y recuerda las coordenadas de tu base.'] },
 { title:'Minería con estrategia', icon:'⛏️', category:'Inicio', description:'Encuentra recursos, mejora tu equipo y vuelve con el inventario lleno.', tips:['En las versiones modernas con altura negativa, los diamantes se generan con mayor frecuencia en zonas profundas. Y=-58 es un nivel habitual para túneles, pero la lava sigue siendo un peligro.','Usa como mínimo un pico de hierro para extraer diamante, oro y redstone. Para obsidiana necesitas diamante o netherita.','El hierro es abundante en montañas altas y también tiene una concentración útil cerca de Y=16. El terreno y la versión afectan a tus resultados.','Ilumina tu recorrido, deja señales de regreso y evita cavar verticalmente hacia arriba o abajo. Fortuna aumenta ciertos botines; Toque de seda conserva bloques compatibles.'] },
 { title:'Combate y protección', icon:'🛡️', category:'Inicio', description:'Aprende a elegir tus batallas y a mantener tus corazones a salvo.', tips:['Prioriza un escudo y una armadura de hierro. Mantén comida en la barra rápida y retírate cuando estés en desventaja.','En Java, espera a que el indicador de ataque se recargue para golpear con toda la fuerza. Bedrock usa un sistema de combate diferente.','Aléjate de un creeper mientras prepara su explosión. Contra esqueletos usa cobertura y escudo; no mires directamente a los endermen.','Practica el arco a distancia. Enfréntate a un enemigo cada vez, ilumina tu base y evita peleas cerca de precipicios o lava.'] },
 { title:'Encanta tu equipamiento', icon:'📖', category:'Avanzado', description:'Protección, Fortuna y Reparación: entiende qué mejora elegir.', tips:['Una mesa de encantamientos necesita un libro, dos diamantes y cuatro bloques de obsidiana. Rodéala con hasta 15 librerías válidas, separadas por un bloque de aire.','Para la opción de nivel 30 necesitas 30 niveles y lapislázuli; el encantamiento consume tres niveles y tres unidades de lapislázuli.','Prioriza Protección en armadura, Eficiencia e Irrompibilidad en herramientas y Fortuna en tu pico de recursos. Reparación utiliza experiencia para reparar objetos equipados o sostenidos.','Combina libros y equipo en un yunque, vigilando el coste. Algunos encantamientos son incompatibles, como Fortuna y Toque de seda en el mismo pico.'] },
 { title:'Construye y automatiza', icon:'🌾', category:'Avanzado', description:'Una base útil, comida renovable y tus primeros circuitos de redstone.', tips:['Empieza por una granja de trigo, zanahorias o patatas. El agua hidrata tierra de cultivo hasta cuatro bloques horizontalmente; aporta suficiente luz y protege los cultivos.','Organiza cofres por materiales y reserva espacio para hornos, mesa de trabajo, cama y acceso a la mina. Ilumina y protege el perímetro.','Prueba palancas, polvo de redstone, repetidores y pistones en creativo antes de construir en supervivencia. Las tolvas transportan objetos hacia contenedores.','Comprueba que cada diseño de granja funciona en tu edición y versión. La redstone, la aparición de criaturas y el comportamiento de aldeanos no son idénticos en Java y Bedrock.'] },
 { title:'Del Nether al dragón', icon:'🔥', category:'Avanzado', description:'Prepárate para otras dimensiones y completa tu gran aventura.', tips:['Construye un portal con un marco mínimo de 10 bloques de obsidiana y enciéndelo. Lleva pedernal y acero de repuesto, bloques, comida y una pieza de armadura de oro para evitar agresión de piglins normales.','Nunca uses camas en el Nether ni en el End: explotan. El agua tampoco se puede colocar normalmente en el Nether. Marca y protege tu portal.','Consigue varas de blaze y perlas de ender para fabricar ojos de ender. Sigue sus lanzamientos hasta una fortaleza y prepara hasta 12 ojos para activar el portal del End.','Antes del End lleva arco, flechas, bloques, agua y buen equipo. Destruye los cristales con cuidado, evita mirar a los endermen y ataca al dragón cuando se pose en la fuente central.'] }
];
const cards = document.querySelector('#cards');
function render(filter = 'all') {
 cards.replaceChildren();
 guides.forEach((guide, index) => {
  if (filter !== 'all' && guide.category !== filter) return;
  const card = document.createElement('article'); card.className = 'card';
  card.innerHTML = `<div class="card-top"><span class="icon" aria-hidden="true">${guide.icon}</span><span class="tag">${guide.category.toUpperCase()}</span></div><h3>${guide.title}</h3><p>${guide.description}</p><button aria-label="Leer guía: ${guide.title}">Leer la guía <span aria-hidden="true">↗</span></button>`;
  card.querySelector('button').addEventListener('click', () => openGuide(index)); cards.append(card);
 });
}
const dialog = document.querySelector('#guide-dialog');
function openGuide(index) {
 const guide = guides[index];
 document.querySelector('#dialog-title').textContent = guide.title;
 document.querySelector('#dialog-category').textContent = `${guide.category} / GUÍA MCGOOD`;
 const list = document.createElement('ul');
 guide.tips.forEach(tip => {const item = document.createElement('li'); item.textContent = tip; list.append(item);});
 document.querySelector('#dialog-body').replaceChildren(list);
 dialog.showModal(); dialog.scrollTop = 0;
}
dialog.setAttribute('aria-labelledby', 'dialog-title');
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#done-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(item => {item.classList.remove('active'); item.setAttribute('aria-pressed','false');});
 button.classList.add('active'); button.setAttribute('aria-pressed','true'); render(button.dataset.filter);
}));
const milestones = ['Crear una mesa de trabajo y herramientas','Construir un refugio y colocar una cama','Asegurar una fuente renovable de comida','Conseguir armadura de hierro y un escudo','Encontrar mis primeros diamantes','Encantar mis herramientas y armadura','Explorar el Nether y conseguir varas de blaze','Llegar al End y derrotar al dragón'];
let saved = [];
try { const value = JSON.parse(localStorage.getItem('mcgood-progress') || '[]'); if(Array.isArray(value)) saved = value.filter(n => Number.isInteger(n) && n >= 0 && n < milestones.length); } catch {}
const checklist = document.querySelector('#checklist');
milestones.forEach((title,index) => {
 const label = document.createElement('label'); const input = document.createElement('input'); input.type = 'checkbox'; input.checked = saved.includes(index); input.value = index;
 const text = document.createElement('span'); text.textContent = title; label.append(input,text); checklist.append(label); input.addEventListener('change', () => updateProgress(true));
});
function updateProgress(persist = false) {
 const selected = [...checklist.querySelectorAll('input:checked')].map(input => Number(input.value));
 document.querySelector('#progress').value = selected.length;
 document.querySelector('#progress-text').textContent = `${selected.length} de ${milestones.length} completados`;
 document.querySelector('#percent').textContent = `${Math.round(selected.length / milestones.length * 100)}%`;
 if(persist) {try { localStorage.setItem('mcgood-progress', JSON.stringify(selected)); document.querySelector('#save-status').textContent = 'Progreso guardado en este navegador.'; } catch {document.querySelector('#save-status').textContent = 'Tu navegador no permite guardar el progreso. Se mantendrá durante esta visita.';}}
}
document.querySelector('#reset').addEventListener('click', () => { checklist.querySelectorAll('input').forEach(input => {input.checked = false;}); updateProgress(true); });
render(); updateProgress();
