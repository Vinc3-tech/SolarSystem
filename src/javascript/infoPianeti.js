const pianetiInfo = {
    sole: {
        nome: "Sole",
        diametroKm: 1392700,
        distanzaDalSoleKm: '',
        periodoOrbitaleGiorni: '',
        composizione: "gassoso",
        src: "src/img/img-sistemaSolare/sun.png",
        descrizione: "Il Sole è la stella al centro del nostro sistema solare. È un'enorme e caldissima sfera di plasma composta principalmente da idrogeno (74%) ed elio (24%). La sua massa rappresenta circa il 99,86% dell'intero sistema solare.",
        curiosita: "Non è fermo: Il Sole orbita attorno al centro della Via Lattea a una velocità di circa 720.000 km/h, trascinando con sé l'intero sistema solare.",
        linkPageHTML: "src/html/sole.html"
    },
    mercurio: {
        nome: "Mercurio",
        diametroKm: 4879,
        distanzaDalSoleKm: 57910000,
        periodoOrbitaleGiorni: 88,
        composizione: "roccioso",
        src: "src/img/img-sistemaSolare/mercury.png",
        descrizione: "Mercurio è il pianeta più vicino al Sole e il più piccolo del Sistema Solare. È un mondo roccioso con un enorme nucleo di ferro che costituisce circa il 75% della sua massa e un sottile guscio di roccia. La sua superficie, simile a quella della Luna, è segnata da miliardi di anni di impatti di asteroidi e comete.",
        curiosita: "Mercurio è visibile a occhio nudo poco prima dell’alba o subito dopo il tramonto, mai a notte piena perché resta vicino al Sole. Dal suo cielo il Sole appare tre volte più grande che dalla Terra, e la luminosità è sette volte maggiore. Nonostante la vicinanza alla nostra stella, Venere — non Mercurio — è il pianeta più caldo, grazie alla sua densa atmosfera.",
        linkPageHTML: "src/html/mercurio.html"
    },
    venere: {
        nome: "Venere",
        diametroKm: 12104,
        distanzaDalSoleKm: 108200000,
        periodoOrbitaleGiorni: 225,
        composizione: "roccioso",
        src: "src/img/img-sistemaSolare/venus.png",
        descrizione: "Venere (Venus in inglese) è il secondo pianeta del Sistema solare, orbitando a circa 108 milioni di chilometri dal Sole. È un pianeta roccioso simile alla Terra per dimensioni e massa, ma con un ambiente estremamente ostile: l’atmosfera densa e ricca di anidride carbonica crea un potente effetto serra che ne fa il pianeta più caldo del sistema solare.",
        curiosita: "Fin dagli anni ’60, numerose missioni — dalle sonde sovietiche Venera al radar orbitante Magellan della NASA — hanno studiato Venere, rivelandone la struttura e la dinamica atmosferica. Le future missioni VERITAS e DAVINCI cercheranno di chiarire la sua evoluzione climatica e geologica. Comprendere come Venere sia divenuto un mondo inospitale aiuta gli scienziati a interpretare l’evoluzione climatica della Terra e dei pianeti rocciosi extrasolari.",
        linkPageHTML: "src/html/venere.html"
    },
    terra: {
        nome: "Terra",
        diametroKm: 12742,
        distanzaDalSoleKm: 149600000,
        periodoOrbitaleGiorni: 365,
        composizione: "roccioso",
        src: "src/img/img-sistemaSolare/earth.png",
        descrizione: "La Terra è il terzo pianeta del sistema solare e l’unico luogo conosciuto nell’universo a ospitare la vita. È il più grande dei pianeti rocciosi e possiede acqua liquida, un’atmosfera protettiva e una geologia dinamica che ne modellano costantemente la superficie.",
        curiosita: "Formata circa 4,5 miliardi di anni fa da gas e polveri del disco solare, la Terra si è evoluta fino a sviluppare oceani, un’atmosfera ricca di ossigeno e una biosfera complessa. Nessun altro pianeta conosciuto possiede contemporaneamente acqua liquida, tettonica a placche e campo magnetico stabile, fattori che la rendono un mondo unico e vitale",
        linkPageHTML: "src/html/terra.html"
    },
    marte: {
        nome: "Marte",
        diametroKm: 6779,
        distanzaDalSoleKm: 227900000,
        periodoOrbitaleGiorni: 687,
        composizione: "roccioso",
        src: "src/img/img-sistemaSolare/mars.png",
        descrizione: "Marte è il quarto pianeta del sistema solare in ordine di distanza dal Sole e il settimo per dimensioni. Conosciuto come il “Pianeta Rosso” per il colore ferruginoso della sua superficie, è l’unico pianeta abitato esclusivamente da robot e rappresenta oggi uno dei principali obiettivi dell’esplorazione spaziale umana.",
        curiosita: "Marte è considerato il pianeta più simile alla Terra. Studiare la sua evoluzione, dal passato più caldo e umido all’attuale deserto gelido, aiuta a comprendere la storia climatica dei pianeti rocciosi. Per molte agenzie spaziali, rappresenta la prossima grande tappa dell’esplorazione umana del sistema solare.",
        linkPageHTML: "src/html/marte.html"
    },
    giove: {
        nome: "Giove",
        diametroKm: 139820,
        distanzaDalSoleKm: 778500000,
        periodoOrbitaleGiorni: 4333,
        composizione: "gassoso",
        src: "src/img/img-sistemaSolare/jupiter.png",
        descrizione: "Giove è il quinto pianeta dal Sole e il più grande del Sistema Solare. Si tratta di un gigante gassoso composto principalmente da idrogeno ed elio, noto per le sue bande nuvolose colorate e la caratteristica Grande Macchia Rossa, una gigantesca tempesta che imperversa da secoli.",
        curiosita: "Il sistema gioviano comprende più di 90 lune, tra cui le quattro scoperte da Galileo Galilei nel 1610: Io, Europa, Ganimede e Callisto. Possiede anche un tenue sistema di anelli, composto principalmente da particelle di polvere generate dagli impatti sui suoi satelliti interni.",
        linkPageHTML: "src/html/giove.html"
    },
    saturno: {
        nome: "Saturno",
        diametroKm: 116460,
        distanzaDalSoleKm: 1434000000,
        periodoOrbitaleGiorni: 10759,
        composizione: "gassoso",
        src: "src/img/img-sistemaSolare/saturn.png",
        descrizione: "Saturno è il sesto pianeta del Sistema Solare, noto per i suoi spettacolari anelli di ghiaccio e polvere. È un gigante gassoso di grandi dimensioni, seconda solo a Giove, e ha un ruolo chiave nello studio della formazione planetaria e dell’evoluzione del Sistema Solare.",
        curiosita: "Il sistema di anelli di Saturno è formato da miliardi di frammenti di ghiaccio e roccia, distribuiti in sette fasce principali. Le sue lune, tra cui Titano, Encelado e Mimas, mostrano caratteristiche uniche: geyser di ghiaccio, atmosfere dense e possibili oceani sotterranei, che li rendono oggetto di grande interesse astrobiologico.",
        linkPageHTML: "src/html/saturno.html"
    },
    urano: {
        nome: "Urano",
        diametroKm: 50724,
        distanzaDalSoleKm: 2871000000,
        periodoOrbitaleGiorni: 30687,
        composizione: "gassoso",
        src: "src/img/img-sistemaSolare/uranus.png",
        descrizione: "Urano è il settimo pianeta dal Sole e il terzo per diametro nel Sistema Solare. È classificato come gigante di ghiaccio per la sua composizione dominata da acqua, ammoniaca e metano in forma fluida. Scoperto nel 1781 da William Herschel, fu il primo pianeta individuato con l’aiuto di un telescopio, ampliando per la prima volta i confini noti del sistema planetario.",
        curiosita: "Uranus ruota su un asse inclinato di circa 98°, quasi parallelo al piano orbitale. Di conseguenza, “gira su un fianco” e alterna periodi polari di luce e oscurità che durano 21 anni terrestri. Questa peculiare inclinazione, probabilmente dovuta a un antico impatto con un corpo delle dimensioni della Terra, genera le stagioni più estreme del Sistema Solare. Inoltre il pianeta possiede un sistema di 13 anelli stretti, formati da particelle scure e sottili.",
        linkPageHTML: "src/html/urano.html"
    },
    nettuno: {
        nome: "Nettuno",
        diametroKm: 49244,
        distanzaDalSoleKm: 4495000000,
        periodoOrbitaleGiorni: 60190,
        composizione: "gassoso",
        src: "src/img/img-sistemaSolare/neptune.png",
        descrizione: "Nettuno è l’ottavo e più distante pianeta del Sistema Solare. È un “gigante di ghiaccio”, formato principalmente da idrogeno, elio e composti ghiacciati come acqua, ammoniaca e metano. La sua intensa colorazione blu e i venti supersonici lo rendono uno dei mondi più dinamici e affascinanti dell’intero sistema planetario.",
        curiosita: "Cinque deboli anelli, parzialmente interrotti in archi, circondano il pianeta. Le 14 lune conosciute includono Tritone, la più grande, che orbita in direzione opposta alla rotazione di Neptune, suggerendo una cattura gravitazionale. Su Tritone sono stati osservati geyser di azoto e possibili segni di oceani sotterranei.",
        linkPageHTML: "src/html/nettuno.html"
    }
};

export default pianetiInfo;