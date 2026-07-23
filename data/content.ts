export const siteConfig = {
  name: "TempleFit",
  slogan: "Centro de Transformación Integral",
  tagline: "Valores Eternos",
  contact: {
    whatsapp: "59169127691",
    message: "Quiero más información sobre TempleFit y el Reto de 21 Días."
  }
};

export const features = [
  {
    id: "reto21",
    title: "Reto 21 Días",
    description: "Programa intensivo de transformación. Hábitos, nutrición y comunidad para reiniciar tu metabolismo y tu mente.",
    icon: "Target",
    color: "temple-gold"
  },
  {
    id: "entrenamiento",
    title: "TempleFit Base",
    description: "Entrenamiento funcional diario diseñado para forjar disciplina, fuerza real y resistencia inquebrantable.",
    icon: "Flame",
    color: "temple-red"
  },
  {
    id: "neuro",
    title: "Neuro Espiritual",
    description: "Mentoría enfocada en inteligencia emocional, ventas y liderazgo bajo principios eternos.",
    icon: "Brain",
    color: "temple-gold"
  },
  {
    id: "sabado",
    title: "Sábado CristoFit",
    description: "Nuestra reunión semanal cumbre. Integración, entrenamiento al aire libre y crecimiento espiritual comunitario.",
    icon: "Users",
    color: "temple-navy"
  }
];

export const testimonials = [
  {
    text: "No es solo sudar, es entrenar con propósito. Las unidades de impacto me ayudaron a transformar no solo mi cuerpo sino mi visión de los negocios.",
    author: "Marcos V.",
    role: "Reto 21 Días",
    initial: "M"
  },
  {
    text: "La hermandad que se forma aquí es real. Sábado CristoFit se ha convertido en el mejor momento de mi semana.",
    author: "Elena R.",
    role: "Atleta TempleFit",
    initial: "E"
  },
  {
    text: "Integrar mi fe con mis objetivos de salud y liderazgo empresarial me dio la claridad mental que buscaba.",
    author: "Carlos D.",
    role: "Neuro Espiritual",
    initial: "C"
  }
];

export const products = [
  {
    id: "plan-keto",
    name: "Plan Nutricional Integral",
    price: 250,
    category: "Suscripción",
    description: "Acompañamiento nutricional optimizado para el Reto 21 Días.",
    image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "camiseta-alpha",
    name: "Camiseta Oficial TempleFit",
    price: 35,
    category: "Textil",
    description: "Algodón premium con diseño exclusivo de Comando Táctico."
  },
  {
    id: "proteina",
    name: "Suplementación Base",
    price: 60,
    category: "Suplemento",
    description: "Proteínas e insumos de alta pureza para recuperación."
  }
];

export const alliances = [
  {
    title: "Comunidad Activa",
    description: "Generamos retención al forjar relaciones genuinas y valores compartidos.",
    icon: "Users"
  },
  {
    title: "Sistema Integral",
    description: "4 unidades de impacto que aseguran crecimiento en todas las áreas del usuario.",
    icon: "Target"
  },
  {
    title: "Crecimiento Sostenible",
    description: "Un modelo escalable basado en resultados reales y testimonios de transformación.",
    icon: "TrendingUp"
  }
];

export const recipeCategories = [
  { id: "all", label: "Todas" },
  { id: "desayuno", label: "Desayuno" },
  { id: "almuerzo", label: "Almuerzo" },
  { id: "cena", label: "Cena" },
  { id: "snack", label: "Snack" },
];

export const recipes = [
  {
    id: "avocado-power-bowl",
    name: "Power Bowl de Aguacate y Huevos",
    category: "desayuno",
    time: 15,
    difficulty: "Fácil",
    servings: 1,
    description: "Arranca tu día con grasas saludables y proteína de alta biodisponibilidad. El desayuno oficial del Reto 21 Días.",
    ingredients: [
      "1 aguacate maduro",
      "2 huevos de pastoreo",
      "1 puñado de microgreens",
      "6 tomates cherry",
      "1 cdta de aceite de oliva extra virgen",
      "Sal rosada y pimienta al gusto",
      "Semillas de chía (opcional)"
    ],
    steps: [
      "Corta el aguacate por la mitad y retira la semilla.",
      "Calienta el aceite de oliva en sartén a fuego medio-alto.",
      "Fríe los huevos al gusto (sunny-side up recomendado) sin romper la yema.",
      "Corta los tomates cherry por la mitad.",
      "Monta el bowl: base de aguacate, huevos encima, rodea con tomates y microgreens.",
      "Sazona con sal rosada y pimienta. Añade semillas de chía si deseas."
    ],
    macros: { calories: 420, protein: 18, fat: 34, carbs: 8 },
    image: "/recetas/avocado-eggs.png"
  },
  {
    id: "pollo-grillado-tactical",
    name: "Pollo Grillado Táctical",
    category: "almuerzo",
    time: 25,
    difficulty: "Media",
    servings: 2,
    description: "Proteína magra con vegetales de hoja verde y grasas esenciales. El almuerzo que construye guerreros.",
    ingredients: [
      "2 pechugas de pollo deshuesadas",
      "2 tazas de mix de lechugas verdes",
      "1 aguacate en láminas",
      "1 limón",
      "2 cdas de aceite de oliva",
      "1 cdta de orégano seco",
      "Sal, pimienta y ajo en polvo"
    ],
    steps: [
      "Sazona las pechugas con sal, pimienta, ajo en polvo y orégano.",
      "Calienta una plancha o sartén de hierro a fuego alto.",
      "Grilla las pechugas 6-7 minutos por lado hasta que estén doradas y cocidas.",
      "Deja reposar 3 minutos antes de cortar en láminas.",
      "Monta la ensalada con las lechugas como base.",
      "Añade el pollo cortado, láminas de aguacate y exprime el limón por encima.",
      "Finaliza con un hilo de aceite de oliva."
    ],
    macros: { calories: 480, protein: 42, fat: 28, carbs: 6 },
    image: "/recetas/chicken-salad.png"
  },
  {
    id: "salmon-omega-force",
    name: "Salmón Omega Force",
    category: "cena",
    time: 20,
    difficulty: "Media",
    servings: 2,
    description: "Omega-3 para recuperación muscular y función cerebral. Cena de élite para atletas de alto rendimiento.",
    ingredients: [
      "2 filetes de salmón (180g c/u)",
      "2 tazas de brócoli en floretes",
      "1 taza de coliflor",
      "2 cdas de mantequilla ghee",
      "1 limón",
      "Eneldo fresco",
      "Sal y pimienta negra"
    ],
    steps: [
      "Precalienta el horno a 200°C / 400°F.",
      "Sazona los filetes de salmón con sal, pimienta y eneldo.",
      "Coloca el salmón en bandeja con papel antiadherente.",
      "Hornea 12-15 minutos hasta que esté firme al tacto.",
      "Mientras, cocina al vapor el brócoli y coliflor por 5 minutos (que queden al dente).",
      "Sirve con mantequilla ghee derretida por encima y rodajas de limón."
    ],
    macros: { calories: 510, protein: 38, fat: 32, carbs: 10 },
    image: "/recetas/salmon-broccoli.png"
  },
  {
    id: "shake-warrior",
    name: "Shake del Guerrero",
    category: "snack",
    time: 5,
    difficulty: "Fácil",
    servings: 1,
    description: "Pre o post-entreno. Proteína + grasas saludables en menos de 5 minutos. Zero azúcar añadida.",
    ingredients: [
      "1 scoop de proteína de suero (chocolate)",
      "1 cda de mantequilla de almendras",
      "200ml de leche de almendras sin azúcar",
      "1/2 cda de cacao puro en polvo",
      "Hielo al gusto",
      "Almendras fileteadas para decorar"
    ],
    steps: [
      "Añade la leche de almendras y el hielo a la licuadora.",
      "Agrega la proteína, mantequilla de almendras y cacao.",
      "Licúa a máxima potencia por 30-45 segundos.",
      "Sirve en vaso alto y decora con almendras fileteadas.",
      "Consume inmediatamente para máxima absorción."
    ],
    macros: { calories: 320, protein: 30, fat: 16, carbs: 6 },
    image: "/recetas/protein-shake.png"
  },
  {
    id: "steak-iron-will",
    name: "Steak Iron Will",
    category: "cena",
    time: 20,
    difficulty: "Media",
    servings: 2,
    description: "Hierro, zinc y proteína completa. El corte perfecto para la reconstrucción muscular post Sábado CristoFit.",
    ingredients: [
      "2 cortes de ribeye (250g c/u)",
      "1 manojo de espárragos frescos",
      "3 cdas de mantequilla",
      "4 dientes de ajo",
      "Romero fresco",
      "Sal gruesa y pimienta negra recién molida"
    ],
    steps: [
      "Saca la carne del refrigerador 30 min antes para que llegue a temperatura ambiente.",
      "Sazona generosamente con sal gruesa y pimienta por ambos lados.",
      "Calienta un sartén de hierro a fuego muy alto hasta que humee ligeramente.",
      "Sella la carne 3-4 min por lado para término medio (ajusta según preferencia).",
      "En los últimos 2 minutos, añade mantequilla, ajo machacado y romero. Baña la carne con la mantequilla.",
      "Deja reposar 5 minutos antes de cortar.",
      "Mientras, saltea los espárragos en la misma sartén por 3 minutos."
    ],
    macros: { calories: 620, protein: 48, fat: 44, carbs: 4 },
    image: "/recetas/steak-veggies.png"
  },
  {
    id: "energy-bombs",
    name: "Bombas de Energía Keto",
    category: "snack",
    time: 15,
    difficulty: "Fácil",
    servings: 12,
    description: "Snack alto en grasa, zero culpa. Perfecto entre comidas o como postre del Reto 21 Días.",
    ingredients: [
      "1 taza de mantequilla de maní natural",
      "1/2 taza de coco rallado sin azúcar",
      "2 cdas de cacao puro en polvo",
      "2 cdas de aceite de coco",
      "1 cda de miel de abeja (opcional, mínima cantidad)",
      "Chips de chocolate oscuro 85% para decorar",
      "Pizca de sal rosada"
    ],
    steps: [
      "Mezcla la mantequilla de maní, coco rallado, cacao y aceite de coco en un bowl.",
      "Añade la miel y sal rosada, mezcla hasta integrar completamente.",
      "Refrigera la mezcla 10 minutos para que sea más fácil de manipular.",
      "Forma bolitas del tamaño de una nuez con las manos (aprox. 12 unidades).",
      "Presiona un chip de chocolate en la superficie de cada bolita.",
      "Refrigera por al menos 1 hora antes de consumir.",
      "Conserva en refrigeración hasta 7 días."
    ],
    macros: { calories: 145, protein: 5, fat: 12, carbs: 4 },
    image: "/recetas/energy-balls.png"
  },
  {
    id: "electrohidra-elite",
    name: "ElectroHidra 'Elite-Hydration'",
    category: "snack",
    time: 5,
    difficulty: "Fácil",
    servings: 1,
    description: "Protocolo de ingesta para máxima hidratación celular antes, durante y después del entreno.",
    ingredients: [
      "1 litro de agua filtrada",
      "1.2g (1/2 cdta) de sal marina/rosada",
      "0.6g (1/8 cdta) de bicarbonato de sodio",
      "0.6g (1/4 cdta) de cloruro de potasio",
      "100mg de citrato de magnesio",
      "60g (3-4 cdas) de miel o glucosa pura",
      "30ml (2 cdas) de jugo cítrico"
    ],
    steps: [
      "Precarga: 5-7 ml por kg de peso unas 4 horas antes.",
      "Intra-entreno: 200–300 ml cada 15-20 minutos.",
      "Reposición: Ingerir el 150% del peso perdido después del ejercicio."
    ],
    macros: { calories: 240, protein: 0, fat: 0, carbs: 60 },
    image: "/recetas/electrohidra.png"
  },
  {
    id: "electrodetox-blast",
    name: "ElectroDetox Blast",
    category: "snack",
    time: 10,
    difficulty: "Fácil",
    servings: 1,
    description: "Bebida desintoxicante y antiparasitaria para consumir en estricto ayuno al despertar.",
    ingredients: [
      "1 litro de infusión base (clavo y canela)",
      "1/2 taza de jugo de pepino (colado)",
      "2 tallos de extracto de apio (colado)",
      "Zumo de 1 limón grande",
      "1 cdta de extracto de jengibre",
      "6–8 hojas de menta"
    ],
    steps: [
      "Preparar la infusión de clavo y canela y dejar enfriar.",
      "Mezclar con los extractos de pepino, apio, limón y jengibre.",
      "Añadir hojas de menta.",
      "Consumir 300-400 ml en estricto ayuno, el resto durante el día (ciclos de 7 a 10 días)."
    ],
    macros: { calories: 15, protein: 1, fat: 0, carbs: 3 },
    image: "/recetas/electrodetox.png"
  },
  {
    id: "infusion-daniel",
    name: "Infusión de Daniel",
    category: "snack",
    time: 10,
    difficulty: "Fácil",
    servings: 1,
    description: "Infusión desintoxicante y antiinflamatoria, perfecta para recuperar el cuerpo y la mente.",
    ingredients: [
      "300ml de agua pura",
      "5g de jengibre fresco rallado",
      "2g de cúrcuma en polvo",
      "15ml de jugo de limón",
      "10g de miel de abeja orgánica",
      "1 rama de canela"
    ],
    steps: [
      "Hervir el agua, agregar jengibre y canela por 5 minutos.",
      "Retirar del fuego y dejar reposar brevemente.",
      "Añadir la cúrcuma, el jugo de limón y la miel.",
      "Servir caliente o frío."
    ],
    macros: { calories: 35, protein: 0, fat: 0, carbs: 9 },
    image: "/recetas/infusion-daniel.png"
  },
  {
    id: "bowl-guerrero",
    name: "Bowl del Guerrero de Elías",
    category: "desayuno",
    time: 15,
    difficulty: "Fácil",
    servings: 1,
    description: "Alta energía pre-entreno con carbohidratos complejos y grasas saludables.",
    ingredients: [
      "60g de avena integral",
      "1 plátano maduro (aprox. 80g)",
      "15g de semillas de chía",
      "20g de nueces o almendras",
      "10g de miel orgánica",
      "1g de canela en polvo"
    ],
    steps: [
      "Remojar la avena por 8 horas o cocinarla con agua/leche por 10 minutos.",
      "Cortar el plátano en rodajas y colocar sobre la avena.",
      "Agregar las semillas de chía y las nueces.",
      "Verter la miel por encima al servir y espolvorear canela."
    ],
    macros: { calories: 560, protein: 14, fat: 20, carbs: 85 },
    image: "/recetas/bowl-guerrero.png"
  },
  {
    id: "smoothie-salomon",
    name: "Smoothie Cerebral de Salomón",
    category: "snack",
    time: 5,
    difficulty: "Fácil",
    servings: 1,
    description: "Potenciador de salud mental y cerebral lleno de antioxidantes y grasas saludables.",
    ingredients: [
      "60g de aguacate maduro",
      "50g de espinaca fresca",
      "60g de arándanos (o moras)",
      "150ml de leche de almendras",
      "2g de cúrcuma + pizca de pimienta negra",
      "15g de semillas de chía"
    ],
    steps: [
      "Colocar todos los ingredientes en la licuadora.",
      "Licuar a alta velocidad hasta obtener una consistencia suave y cremosa.",
      "Servir frío inmediatamente."
    ],
    macros: { calories: 235, protein: 5, fat: 18, carbs: 20 },
    image: "/recetas/smoothie-salomon.png"
  },
  {
    id: "ensalada-eden",
    name: "Ensalada del Jardín del Edén",
    category: "almuerzo",
    time: 15,
    difficulty: "Fácil",
    servings: 1,
    description: "Un plato detox y antiinflamatorio, lleno de colores y nutrientes vivos.",
    ingredients: [
      "50g de espinacas frescas",
      "50g de remolacha rallada",
      "60g de zanahoria rallada",
      "60g de tomate cherry",
      "40g de aguacate en cubos",
      "15g de nueces picadas",
      "15ml de aceite de oliva extra virgen + limón",
      "3g de ajo crudo rallado"
    ],
    steps: [
      "Lavar y preparar todos los vegetales frescos.",
      "Integrar las espinacas, remolacha, zanahoria, tomates y aguacate en un bowl.",
      "Preparar el aliño mezclando el aceite de oliva, limón y el ajo rallado.",
      "Bañar la ensalada, espolvorear las nueces picadas y servir."
    ],
    macros: { calories: 350, protein: 6, fat: 30, carbs: 20 },
    image: "/recetas/ensalada-eden.png"
  },
  {
    id: "te-profetas",
    name: "Té de los Profetas",
    category: "snack",
    time: 10,
    difficulty: "Fácil",
    servings: 1,
    description: "Inmunoestimulante y espiritual. Una infusión profunda y reconfortante.",
    ingredients: [
      "5g de jengibre fresco",
      "1 raja de canela de Ceilán",
      "2 unid. de clavo de olor",
      "2g de cúrcuma",
      "5g de hierbabuena o menta",
      "10g de miel de abeja pura",
      "15ml de jugo de limón"
    ],
    steps: [
      "Hervir agua con el jengibre, la canela y el clavo durante 8 minutos.",
      "Retirar del fuego y colar la infusión.",
      "Añadir la cúrcuma, la hierbabuena fresca, la miel y el limón al gusto.",
      "Servir y disfrutar caliente."
    ],
    macros: { calories: 35, protein: 0, fat: 0, carbs: 9 },
    image: "/recetas/te-profetas.png"
  }
];
