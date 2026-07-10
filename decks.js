// ============================================================
// Le Petit Prince — vocabulary decks (one deck per chapter)
// ============================================================
// To import/edit cards with Claude Code, edit this file.
// Card shape: { id, fr, en, ph }
//   id — stable unique id (never change it once you've studied
//        the card, it's the key that sync/progress hangs on)
//   fr — French word (front of the card)
//   en — English meaning (back of the card)
//   ph — short phrase from / inspired by the book (shown on the back)
// Mnemonic notes are NOT stored here — they live in your synced
// progress state so you can edit them from any device.

const LPP_DECKS = [
  {
    n: 1, title: "I · Les dessins de boas", emoji: "🎩",
    cards: [
      { id: "01-foret-vierge", fr: "une forêt vierge", en: "a virgin forest", ph: "un livre sur la forêt vierge" },
      { id: "01-boa", fr: "un serpent boa", en: "a boa constrictor", ph: "Un boa avale sa proie tout entière." },
      { id: "01-avaler", fr: "avaler", en: "to swallow", ph: "Le boa avale sa proie sans la mâcher." },
      { id: "01-proie", fr: "une proie", en: "a prey", ph: "Un boa qui avale sa proie" },
      { id: "01-macher", fr: "mâcher", en: "to chew", ph: "sans la mâcher" },
      { id: "01-digestion", fr: "la digestion", en: "digestion", ph: "les six mois de sa digestion" },
      { id: "01-chef-doeuvre", fr: "un chef-d'œuvre", en: "a masterpiece", ph: "mon dessin numéro 1 — mon chef-d'œuvre" },
      { id: "01-dessin", fr: "un dessin", en: "a drawing", ph: "Mon dessin ne représentait pas un chapeau." },
      { id: "01-effrayant", fr: "effrayant", en: "frightening, scary", ph: "Pourquoi un chapeau serait-il effrayant ?" },
      { id: "01-chapeau", fr: "un chapeau", en: "a hat", ph: "Elles m'ont répondu : « Pourquoi un chapeau ferait-il peur ? »" },
      { id: "01-metier", fr: "un métier", en: "a job, profession", ph: "J'ai donc choisi un autre métier : pilote." },
      { id: "01-egare", fr: "s'égarer", en: "to get lost, go astray", ph: "reconnaître la Chine si l'on s'est égaré pendant la nuit" },
    ]
  },
  {
    n: 2, title: "II · Dessine-moi un mouton", emoji: "🐑",
    cards: [
      { id: "02-panne", fr: "une panne", en: "a breakdown", ph: "une panne dans le désert du Sahara" },
      { id: "02-desert", fr: "le désert", en: "the desert", ph: "seul dans le désert, à mille milles de toute terre habitée" },
      { id: "02-naufrage", fr: "un naufragé", en: "a shipwrecked person", ph: "plus isolé qu'un naufragé sur un radeau" },
      { id: "02-radeau", fr: "un radeau", en: "a raft", ph: "un naufragé sur un radeau au milieu de l'océan" },
      { id: "02-aube", fr: "l'aube (f)", en: "dawn", ph: "réveillé à l'aube par une drôle de petite voix" },
      { id: "02-drole", fr: "drôle", en: "funny, odd", ph: "une drôle de petite voix" },
      { id: "02-mouton", fr: "un mouton", en: "a sheep", ph: "S'il vous plaît… dessine-moi un mouton !" },
      { id: "02-dessiner", fr: "dessiner", en: "to draw", ph: "Dessine-moi un mouton !" },
      { id: "02-apparition", fr: "une apparition", en: "an apparition", ph: "Je regardai cette apparition avec des yeux ronds d'étonnement." },
      { id: "02-belier", fr: "un bélier", en: "a ram", ph: "Ce n'est pas un mouton, c'est un bélier. Il a des cornes." },
      { id: "02-cornes", fr: "des cornes (f)", en: "horns", ph: "Il a des cornes…" },
      { id: "02-caisse", fr: "une caisse", en: "a crate, a box", ph: "Ça, c'est la caisse. Le mouton que tu veux est dedans." },
      { id: "02-griffonner", fr: "griffonner", en: "to scribble", ph: "Je griffonnai ce dessin-ci." },
    ]
  },
  {
    n: 3, title: "III · D'où viens-tu ?", emoji: "🪐",
    cards: [
      { id: "03-tomber-du-ciel", fr: "tomber du ciel", en: "to fall from the sky", ph: "Tu es donc tombé du ciel !" },
      { id: "03-avion", fr: "un avion", en: "an airplane", ph: "Ce n'est pas une chose, ça vole. C'est un avion." },
      { id: "03-voler", fr: "voler", en: "to fly", ph: "Comment ! tu es tombé du ciel ? — Oui, fis-je modestement." },
      { id: "03-planete", fr: "une planète", en: "a planet", ph: "Tu viens donc d'une autre planète ?" },
      { id: "03-eclat-de-rire", fr: "un éclat de rire", en: "a burst of laughter", ph: "un joli éclat de rire qui m'irrita beaucoup" },
      { id: "03-reverie", fr: "une rêverie", en: "a daydream, reverie", ph: "Il s'enfonça dans une rêverie qui dura longtemps." },
      { id: "03-piquet", fr: "un piquet", en: "a stake, a post", ph: "Je te donnerai un piquet pour l'attacher." },
      { id: "03-attacher", fr: "attacher", en: "to tie (up)", ph: "L'attacher ? Quelle drôle d'idée !" },
      { id: "03-ficelle", fr: "une ficelle", en: "a string", ph: "une ficelle pour attacher le mouton pendant le jour" },
      { id: "03-tout-droit", fr: "tout droit", en: "straight ahead", ph: "Droit devant soi, on ne peut pas aller bien loin…" },
      { id: "03-tresor", fr: "un trésor", en: "a treasure", ph: "Il s'enfonça dans la contemplation de son trésor." },
    ]
  },
  {
    n: 4, title: "IV · L'astéroïde B 612", emoji: "🔭",
    cards: [
      { id: "04-asteroide", fr: "un astéroïde", en: "an asteroid", ph: "la planète d'où il venait est l'astéroïde B 612" },
      { id: "04-astronome", fr: "un astronome", en: "an astronomer", ph: "aperçu une fois au télescope par un astronome turc" },
      { id: "04-telescope", fr: "un télescope", en: "a telescope", ph: "aperçu au télescope, en 1909" },
      { id: "04-preuve", fr: "une preuve", en: "a proof, evidence", ph: "la preuve que le petit prince a existé" },
      { id: "04-chiffre", fr: "un chiffre", en: "a figure, a number", ph: "Les grandes personnes aiment les chiffres." },
      { id: "04-grandes-personnes", fr: "les grandes personnes", en: "the grown-ups", ph: "Les grandes personnes sont comme ça." },
      { id: "04-papillon", fr: "un papillon", en: "a butterfly", ph: "Est-ce qu'il collectionne les papillons ?" },
      { id: "04-peser", fr: "peser", en: "to weigh", ph: "Combien pèse-t-il ?" },
      { id: "04-gagner", fr: "gagner", en: "to earn, to win", ph: "Combien gagne son père ?" },
      { id: "04-demonstration", fr: "une démonstration", en: "a demonstration, proof", ph: "Il refit sa démonstration en 1920." },
      { id: "04-costume", fr: "un costume", en: "a suit", ph: "Personne ne l'avait cru, à cause de son costume." },
      { id: "04-hausser", fr: "hausser les épaules", en: "to shrug", ph: "Elles hausseront les épaules et vous traiteront d'enfant !" },
    ]
  },
  {
    n: 5, title: "V · Les baobabs", emoji: "🌱",
    cards: [
      { id: "05-baobab", fr: "un baobab", en: "a baobab (tree)", ph: "Les baobabs, avant de grandir, commencent par être petits." },
      { id: "05-graine", fr: "une graine", en: "a seed", ph: "Le sol de la planète en était infesté — des graines de baobabs." },
      { id: "05-brindille", fr: "une brindille", en: "a twig, a sprout", ph: "une ravissante petite brindille inoffensive" },
      { id: "05-pousser", fr: "pousser", en: "to grow (plants)", ph: "Quand il s'agit d'un baobab, ça pousse vite." },
      { id: "05-etirer", fr: "s'étirer", en: "to stretch (oneself)", ph: "Elle s'étire d'abord timidement vers le soleil." },
      { id: "05-arbuste", fr: "un arbuste", en: "a shrub, a bush", ph: "On peut le laisser grandir si c'est un arbuste." },
      { id: "05-arracher", fr: "arracher", en: "to pull out, uproot", ph: "Il faut arracher le baobab dès qu'on le reconnaît." },
      { id: "05-infeste", fr: "infesté", en: "infested, overrun", ph: "Le sol de la planète en était infesté." },
      { id: "05-sol", fr: "le sol", en: "the ground, the soil", ph: "Le sol de la planète en était infesté." },
      { id: "05-eclater", fr: "faire éclater", en: "to make burst, to shatter", ph: "S'il y a trop de baobabs, ils font éclater la planète." },
      { id: "05-radis", fr: "un radis", en: "a radish", ph: "des brindilles de radis ou de rosiers" },
      { id: "05-discipline", fr: "la discipline", en: "discipline", ph: "C'est une question de discipline." },
      { id: "05-paresseux", fr: "un paresseux", en: "a lazy person", ph: "Il y habitait un paresseux. Il avait négligé trois arbustes…" },
    ]
  },
  {
    n: 6, title: "VI · Les couchers de soleil", emoji: "🌅",
    cards: [
      { id: "06-coucher-soleil", fr: "un coucher de soleil", en: "a sunset", ph: "J'aime bien les couchers de soleil." },
      { id: "06-douceur", fr: "la douceur", en: "sweetness, gentleness", ph: "la douceur des couchers de soleil" },
      { id: "06-melancolique", fr: "mélancolique", en: "melancholic", ph: "ta petite vie mélancolique" },
      { id: "06-triste", fr: "triste", en: "sad", ph: "Quand on est tellement triste, on aime les couchers de soleil." },
      { id: "06-chaise", fr: "une chaise", en: "a chair", ph: "Tu tirais ta chaise de quelques pas…" },
      { id: "06-crepuscule", fr: "le crépuscule", en: "twilight, dusk", ph: "Tu regardais le crépuscule chaque fois que tu le voulais." },
      { id: "06-attendre", fr: "attendre", en: "to wait (for)", ph: "Il faut attendre que le soleil se couche." },
      { id: "06-distraction", fr: "une distraction", en: "an amusement, distraction", ph: "Tu n'as eu longtemps pour distraction que la douceur des couchers de soleil." },
    ]
  },
  {
    n: 7, title: "VII · La guerre des épines", emoji: "🌵",
    cards: [
      { id: "07-epine", fr: "une épine", en: "a thorn", ph: "Les épines, à quoi servent-elles ?" },
      { id: "07-servir-a", fr: "servir à", en: "to be used for", ph: "Les épines, ça ne sert à rien." },
      { id: "07-mechancete", fr: "la méchanceté", en: "spite, meanness", ph: "C'est de la pure méchanceté de la part des fleurs !" },
      { id: "07-se-croire", fr: "se croire", en: "to believe oneself (to be)", ph: "Elles se croient terribles avec leurs épines." },
      { id: "07-boulon", fr: "un boulon", en: "a bolt", ph: "un boulon trop serré dans mon moteur" },
      { id: "07-serre", fr: "serré", en: "tight", ph: "un boulon trop serré" },
      { id: "07-marteau", fr: "un marteau", en: "a hammer", ph: "mon marteau à la main" },
      { id: "07-cambouis", fr: "le cambouis", en: "engine grease", ph: "les doigts noirs de cambouis" },
      { id: "07-guerre", fr: "la guerre", en: "war", ph: "Ce n'est pas important, la guerre des moutons et des fleurs ?" },
      { id: "07-champignon", fr: "un champignon", en: "a mushroom", ph: "Ce n'est pas un homme, c'est un champignon !" },
      { id: "07-sanglots", fr: "éclater en sanglots", en: "to burst into sobs", ph: "Il éclata brusquement en sanglots." },
      { id: "07-bercer", fr: "bercer", en: "to rock, to cradle", ph: "Je le berçais." },
      { id: "07-unique", fr: "unique au monde", en: "unique in the world", ph: "une fleur unique au monde" },
    ]
  },
  {
    n: 8, title: "VIII · La rose", emoji: "🌹",
    cards: [
      { id: "08-bouton", fr: "un bouton", en: "a bud", ph: "un énorme bouton qui préparait un miracle" },
      { id: "08-coquette", fr: "coquette", en: "vain about looks, flirtatious", ph: "Elle choisissait avec soin ses couleurs, si coquette !" },
      { id: "08-fripe", fr: "fripé", en: "crumpled, rumpled", ph: "Elle ne voulait pas sortir toute fripée comme les coquelicots." },
      { id: "08-coquelicot", fr: "un coquelicot", en: "a poppy", ph: "toute fripée comme les coquelicots" },
      { id: "08-arroser", fr: "arroser", en: "to water (a plant)", ph: "C'est l'heure, je crois, de m'arroser." },
      { id: "08-embaumer", fr: "embaumer", en: "to fill with fragrance", ph: "Cette fleur embaumait ma planète." },
      { id: "08-chenille", fr: "une chenille", en: "a caterpillar", ph: "Il faut bien que je supporte deux ou trois chenilles si je veux connaître les papillons." },
      { id: "08-paravent", fr: "un paravent", en: "a folding screen", ph: "N'avez-vous pas un paravent ?" },
      { id: "08-courant-dair", fr: "un courant d'air", en: "a draft (of air)", ph: "J'ai horreur des courants d'air." },
      { id: "08-griffe", fr: "une griffe", en: "a claw", ph: "Qu'ils viennent donc, les tigres, avec leurs griffes !" },
      { id: "08-tigre", fr: "un tigre", en: "a tiger", ph: "Qu'ils viennent donc, les tigres !" },
      { id: "08-tendresse", fr: "la tendresse", en: "tenderness", ph: "J'aurais dû deviner sa tendresse derrière ses pauvres ruses." },
      { id: "08-ruse", fr: "une ruse", en: "a trick, a ruse", ph: "ses pauvres ruses" },
    ]
  },
  {
    n: 9, title: "IX · Le départ", emoji: "🌋",
    cards: [
      { id: "09-evasion", fr: "une évasion", en: "an escape", ph: "Il profita d'une migration d'oiseaux sauvages pour son évasion." },
      { id: "09-oiseau-sauvage", fr: "un oiseau sauvage", en: "a wild bird", ph: "une migration d'oiseaux sauvages" },
      { id: "09-ramoner", fr: "ramoner", en: "to sweep (a chimney)", ph: "Il ramona soigneusement ses volcans en activité." },
      { id: "09-volcan", fr: "un volcan", en: "a volcano", ph: "Il possédait deux volcans en activité." },
      { id: "09-en-activite", fr: "en activité", en: "active (volcano)", ph: "deux volcans en activité" },
      { id: "09-eteint", fr: "éteint", en: "extinct, extinguished", ph: "Il possédait aussi un volcan éteint. Mais on ne sait jamais !" },
      { id: "09-chauffer", fr: "faire chauffer", en: "to heat up", ph: "C'est bien commode pour faire chauffer le petit déjeuner." },
      { id: "09-eruption", fr: "une éruption", en: "an eruption", ph: "Les éruptions volcaniques sont comme des feux de cheminée." },
      { id: "09-enrhume", fr: "enrhumé", en: "having a cold", ph: "Je ne suis pas si enrhumée que ça…" },
      { id: "09-reproche", fr: "un reproche", en: "a reproach", ph: "Il fut surpris par cette absence de reproches." },
      { id: "09-pleurer", fr: "pleurer", en: "to cry", ph: "Elle ne voulait pas qu'il la vît pleurer." },
      { id: "09-tacher", fr: "tâcher de", en: "to try to", ph: "Tâche d'être heureuse." },
    ]
  },
  {
    n: 10, title: "X · Le roi", emoji: "👑",
    cards: [
      { id: "10-roi", fr: "un roi", en: "a king", ph: "La première était habitée par un roi." },
      { id: "10-trone", fr: "un trône", en: "a throne", ph: "assis sur un trône très simple et cependant majestueux" },
      { id: "10-majestueux", fr: "majestueux", en: "majestic", ph: "un trône très simple et cependant majestueux" },
      { id: "10-manteau", fr: "un manteau", en: "a coat, a cloak", ph: "un manteau de pourpre et d'hermine" },
      { id: "10-sujet", fr: "un sujet", en: "a subject (of a king)", ph: "Ah ! voilà un sujet !" },
      { id: "10-regner", fr: "régner", en: "to reign", ph: "Sire, sur quoi régnez-vous ? — Sur tout." },
      { id: "10-ordonner", fr: "ordonner", en: "to order, command", ph: "Je te l'ordonne." },
      { id: "10-obeir", fr: "obéir", en: "to obey", ph: "Et si le général n'obéissait pas ?" },
      { id: "10-bailler", fr: "bâiller", en: "to yawn", ph: "Je t'ordonne de bâiller." },
      { id: "10-autorite", fr: "l'autorité (f)", en: "authority", ph: "L'autorité repose d'abord sur la raison." },
      { id: "10-juger", fr: "juger", en: "to judge", ph: "Tu te jugeras donc toi-même. C'est le plus difficile." },
      { id: "10-condamner", fr: "condamner", en: "to condemn, sentence", ph: "Tu le condamneras à mort de temps en temps." },
      { id: "10-gracier", fr: "gracier", en: "to pardon (a condemned person)", ph: "Mais tu le gracieras chaque fois pour l'économiser." },
      { id: "10-ambassadeur", fr: "un ambassadeur", en: "an ambassador", ph: "Je te fais mon ambassadeur !" },
    ]
  },
  {
    n: 11, title: "XI · Le vaniteux", emoji: "👏",
    cards: [
      { id: "11-vaniteux", fr: "un vaniteux", en: "a conceited man", ph: "La seconde planète était habitée par un vaniteux." },
      { id: "11-admirateur", fr: "un admirateur", en: "an admirer", ph: "Ah ! Ah ! Voilà la visite d'un admirateur !" },
      { id: "11-acclamer", fr: "acclamer", en: "to cheer, acclaim", ph: "C'est pour saluer quand on m'acclame." },
      { id: "11-saluer", fr: "saluer", en: "to greet, to raise one's hat", ph: "Le vaniteux salua modestement en soulevant son chapeau." },
      { id: "11-soulever", fr: "soulever", en: "to lift, to raise", ph: "en soulevant son chapeau" },
      { id: "11-frapper-mains", fr: "frapper des mains", en: "to clap one's hands", ph: "Frappe tes mains l'une contre l'autre." },
      { id: "11-louange", fr: "la louange", en: "praise", ph: "Les vaniteux n'entendent jamais que les louanges." },
      { id: "11-admirer", fr: "admirer", en: "to admire", ph: "Admire-moi quand même !" },
      { id: "11-modeste", fr: "modeste", en: "modest", ph: "Le vaniteux salua modestement." },
      { id: "11-monotonie", fr: "la monotonie", en: "monotony", ph: "Le petit prince se fatigua de la monotonie du jeu." },
    ]
  },
  {
    n: 12, title: "XII · Le buveur", emoji: "🍷",
    cards: [
      { id: "12-buveur", fr: "un buveur", en: "a drinker", ph: "La planète suivante était habitée par un buveur." },
      { id: "12-boire", fr: "boire", en: "to drink", ph: "Que fais-tu là ? — Je bois." },
      { id: "12-bouteille", fr: "une bouteille", en: "a bottle", ph: "une collection de bouteilles vides et de bouteilles pleines" },
      { id: "12-vide", fr: "vide", en: "empty", ph: "des bouteilles vides" },
      { id: "12-plein", fr: "plein", en: "full", ph: "des bouteilles pleines" },
      { id: "12-honte", fr: "la honte", en: "shame", ph: "Honte de boire !" },
      { id: "12-avoir-honte", fr: "avoir honte", en: "to be ashamed", ph: "Pour oublier que j'ai honte." },
      { id: "12-oublier", fr: "oublier", en: "to forget", ph: "Je bois pour oublier." },
      { id: "12-avouer", fr: "avouer", en: "to confess, admit", ph: "avoua le buveur en baissant la tête" },
      { id: "12-baisser", fr: "baisser la tête", en: "to lower one's head", ph: "en baissant la tête" },
      { id: "12-secourir", fr: "secourir", en: "to help, to rescue", ph: "Le petit prince aurait voulu le secourir." },
      { id: "12-silence", fr: "s'enfermer dans le silence", en: "to shut oneself in silence", ph: "Le buveur s'enferma définitivement dans le silence." },
    ]
  },
  {
    n: 13, title: "XIII · Le businessman", emoji: "💼",
    cards: [
      { id: "13-compter", fr: "compter", en: "to count", ph: "Trois et deux font cinq. Cinq et sept, douze." },
      { id: "13-etoile", fr: "une étoile", en: "a star", ph: "Je possède les étoiles." },
      { id: "13-posseder", fr: "posséder", en: "to own, possess", ph: "Et à quoi cela te sert-il de posséder les étoiles ?" },
      { id: "13-hanneton", fr: "un hanneton", en: "a June bug, cockchafer", ph: "J'ai été dérangé par un hanneton, tombé de je ne sais où." },
      { id: "13-deranger", fr: "déranger", en: "to disturb", ph: "J'ai été dérangé trois fois en cinquante-quatre ans." },
      { id: "13-serieux", fr: "sérieux", en: "serious", ph: "Je suis un homme sérieux, moi !" },
      { id: "13-flaner", fr: "flâner", en: "to stroll, to idle", ph: "Je n'ai pas le temps de flâner." },
      { id: "13-balivernes", fr: "des balivernes (f)", en: "nonsense, twaddle", ph: "Je ne m'amuse pas à des balivernes !" },
      { id: "13-tiroir", fr: "un tiroir", en: "a drawer", ph: "J'enferme ce papier-là à clef dans un tiroir." },
      { id: "13-clef", fr: "une clef", en: "a key", ph: "enfermer à clef" },
      { id: "13-foulard", fr: "un foulard", en: "a scarf", ph: "Si je possède un foulard, je puis le mettre autour de mon cou." },
      { id: "13-cueillir", fr: "cueillir", en: "to pick (a flower)", ph: "Si je possède une fleur, je puis cueillir ma fleur." },
      { id: "13-utile", fr: "utile", en: "useful", ph: "C'est utile à mes volcans que je les possède." },
    ]
  },
  {
    n: 14, title: "XIV · L'allumeur de réverbères", emoji: "🏮",
    cards: [
      { id: "14-allumeur", fr: "un allumeur de réverbères", en: "a lamplighter", ph: "La cinquième planète était habitée par un allumeur de réverbères." },
      { id: "14-reverbere", fr: "un réverbère", en: "a street lamp", ph: "Il y avait juste assez de place pour un réverbère." },
      { id: "14-allumer", fr: "allumer", en: "to light, turn on", ph: "Quand il allume son réverbère, c'est comme s'il faisait naître une étoile." },
      { id: "14-eteindre", fr: "éteindre", en: "to put out, turn off", ph: "Pourquoi viens-tu d'éteindre ton réverbère ?" },
      { id: "14-consigne", fr: "la consigne", en: "the orders, instructions", ph: "C'est la consigne. — Je ne comprends pas. — Il n'y a rien à comprendre." },
      { id: "14-terrible", fr: "terrible", en: "terrible, dreadful", ph: "Je fais là un métier terrible." },
      { id: "14-fidele", fr: "fidèle", en: "faithful, loyal", ph: "Cet homme est fidèle à la consigne." },
      { id: "14-repos", fr: "le repos", en: "rest", ph: "Je n'ai pas une seconde de repos." },
      { id: "14-enjambee", fr: "une enjambée", en: "a stride", ph: "Ta planète est tellement petite que tu en fais le tour en trois enjambées." },
      { id: "14-faire-le-tour", fr: "faire le tour", en: "to go around", ph: "en faire le tour en trois enjambées" },
      { id: "14-mepriser", fr: "mépriser", en: "to despise, look down on", ph: "Celui-là serait méprisé par tous les autres." },
      { id: "14-soccuper", fr: "s'occuper de", en: "to busy oneself with", ph: "Celui-là, au moins, s'occupe d'autre chose que de soi-même." },
    ]
  },
  {
    n: 15, title: "XV · Le géographe", emoji: "🗺️",
    cards: [
      { id: "15-geographe", fr: "un géographe", en: "a geographer", ph: "Je suis géographe, dit le vieux Monsieur." },
      { id: "15-savant", fr: "un savant", en: "a scholar, scientist", ph: "C'est un savant qui connaît où se trouvent les mers, les fleuves, les villes…" },
      { id: "15-fleuve", fr: "un fleuve", en: "a (large) river", ph: "où se trouvent les mers, les fleuves, les villes, les montagnes" },
      { id: "15-explorateur", fr: "un explorateur", en: "an explorer", ph: "Le géographe reçoit les explorateurs dans son bureau." },
      { id: "15-decouverte", fr: "une découverte", en: "a discovery", ph: "On fait une enquête sur sa découverte." },
      { id: "15-enquete", fr: "une enquête", en: "an inquiry, investigation", ph: "On fait d'abord une enquête sur sa moralité." },
      { id: "15-moralite", fr: "la moralité", en: "morality, moral character", ph: "une enquête sur sa moralité" },
      { id: "15-mentir", fr: "mentir", en: "to lie", ph: "Un explorateur qui mentirait entraînerait des catastrophes." },
      { id: "15-voir-double", fr: "voir double", en: "to see double", ph: "Un explorateur qui boirait trop verrait double." },
      { id: "15-crayon", fr: "noter au crayon", en: "to note in pencil", ph: "On note d'abord au crayon les récits des explorateurs." },
      { id: "15-encre", fr: "l'encre (f)", en: "ink", ph: "On attend des preuves pour noter à l'encre." },
      { id: "15-ephemere", fr: "éphémère", en: "ephemeral, fleeting", ph: "Ça signifie « qui est menacé de disparition prochaine »." },
      { id: "15-menace", fr: "menacé de disparition", en: "threatened with disappearing", ph: "Ma fleur est menacée de disparition prochaine ?" },
    ]
  },
  {
    n: 16, title: "XVI · La Terre", emoji: "🌍",
    cards: [
      { id: "16-terre", fr: "la Terre", en: "the Earth", ph: "La septième planète fut donc la Terre." },
      { id: "16-quelconque", fr: "quelconque", en: "ordinary, run-of-the-mill", ph: "La Terre n'est pas une planète quelconque !" },
      { id: "16-milliard", fr: "un milliard", en: "a billion", ph: "environ deux milliards de grandes personnes" },
      { id: "16-armee", fr: "une armée", en: "an army", ph: "une véritable armée de quatre cent soixante-deux mille cinq cent onze allumeurs de réverbères" },
      { id: "16-continent", fr: "un continent", en: "a continent", ph: "sur les six continents" },
      { id: "16-ballet", fr: "un ballet", en: "a ballet", ph: "des mouvements réglés comme ceux d'un ballet d'opéra" },
      { id: "16-regle", fr: "réglé", en: "regulated, orderly", ph: "réglés comme un ballet d'opéra" },
      { id: "16-a-leur-tour", fr: "à leur tour", en: "in their turn", ph: "Ils entraient à leur tour dans la danse." },
    ]
  },
  {
    n: 17, title: "XVII · Le serpent", emoji: "🐍",
    cards: [
      { id: "17-serpent", fr: "un serpent", en: "a snake", ph: "Le premier qu'il rencontra sur la Terre fut un serpent." },
      { id: "17-sable", fr: "le sable", en: "the sand", ph: "Le petit prince s'assit sur le sable." },
      { id: "17-anneau", fr: "un anneau", en: "a ring, a coil", ph: "un anneau couleur de lune" },
      { id: "17-cheville", fr: "une cheville", en: "an ankle", ph: "Il s'enroula autour de la cheville du petit prince." },
      { id: "17-enrouler", fr: "s'enrouler", en: "to coil around", ph: "comme un bracelet d'or à la cheville" },
      { id: "17-doigt", fr: "un doigt", en: "a finger", ph: "Tu n'es pas plus gros qu'un doigt…" },
      { id: "17-puissant", fr: "puissant", en: "powerful", ph: "Je suis plus puissant que le doigt d'un roi." },
      { id: "17-enigme", fr: "une énigme", en: "a riddle, an enigma", ph: "Tu parles toujours par énigmes ? — Je les résous toutes." },
      { id: "17-resoudre", fr: "résoudre", en: "to solve", ph: "Je les résous toutes." },
      { id: "17-granit", fr: "le granit", en: "granite", ph: "Tu me fais pitié, toi si faible, sur cette Terre de granit." },
      { id: "17-faible", fr: "faible", en: "weak", ph: "toi si faible" },
      { id: "17-pitie", fr: "faire pitié", en: "to inspire pity", ph: "Tu me fais pitié." },
      { id: "17-regretter", fr: "regretter", en: "to miss, to regret", ph: "Je puis t'aider un jour si tu regrettes trop ta planète." },
    ]
  },
  {
    n: 18, title: "XVIII · La fleur du désert", emoji: "🌸",
    cards: [
      { id: "18-traverser", fr: "traverser", en: "to cross", ph: "Le petit prince traversa le désert." },
      { id: "18-petale", fr: "un pétale", en: "a petal", ph: "une fleur à trois pétales, une fleur de rien du tout" },
      { id: "18-caravane", fr: "une caravane", en: "a caravan", ph: "Elle avait vu passer une caravane." },
      { id: "18-passer", fr: "passer", en: "to pass by", ph: "Elle avait vu passer une caravane." },
      { id: "18-vent", fr: "le vent", en: "the wind", ph: "Le vent les promène." },
      { id: "18-racines", fr: "des racines (f)", en: "roots", ph: "Ils manquent de racines, ça les gêne beaucoup." },
      { id: "18-manquer", fr: "manquer de", en: "to lack", ph: "Ils manquent de racines." },
      { id: "18-gener", fr: "gêner", en: "to bother, hinder", ph: "Ça les gêne beaucoup." },
      { id: "18-promener", fr: "promener", en: "to carry along, take for a walk", ph: "Le vent les promène." },
    ]
  },
  {
    n: 19, title: "XIX · L'écho", emoji: "⛰️",
    cards: [
      { id: "19-montagne", fr: "une montagne", en: "a mountain", ph: "Le petit prince fit l'ascension d'une haute montagne." },
      { id: "19-ascension", fr: "l'ascension (f)", en: "the climb, ascent", ph: "faire l'ascension d'une haute montagne" },
      { id: "19-genou", fr: "un genou", en: "a knee", ph: "trois volcans qui lui arrivaient au genou" },
      { id: "19-tabouret", fr: "un tabouret", en: "a stool", ph: "Il se servait du volcan éteint comme d'un tabouret." },
      { id: "19-apercevoir", fr: "apercevoir", en: "to catch sight of", ph: "J'apercevrai d'un coup toute la planète et tous les hommes." },
      { id: "19-aiguille", fr: "une aiguille", en: "a needle", ph: "des aiguilles de roc bien aiguisées" },
      { id: "19-roc", fr: "un roc", en: "a rock, a crag", ph: "des aiguilles de roc" },
      { id: "19-echo", fr: "l'écho (m)", en: "the echo", ph: "Bonjour… bonjour… bonjour… répondit l'écho." },
      { id: "19-repeter", fr: "répéter", en: "to repeat", ph: "Les hommes répètent ce qu'on leur dit…" },
      { id: "19-sec", fr: "sec / sèche", en: "dry", ph: "Quelle drôle de planète ! Elle est toute sèche…" },
      { id: "19-pointu", fr: "pointu", en: "pointed, sharp", ph: "toute pointue et toute salée" },
      { id: "19-sale", fr: "salé", en: "salty", ph: "toute salée" },
    ]
  },
  {
    n: 20, title: "XX · Le jardin de roses", emoji: "💐",
    cards: [
      { id: "20-jardin", fr: "un jardin", en: "a garden", ph: "un jardin fleuri de roses" },
      { id: "20-fleuri", fr: "fleuri", en: "in bloom, flowery", ph: "un jardin fleuri de roses" },
      { id: "20-rose", fr: "une rose", en: "a rose", ph: "Nous sommes des roses, dirent les roses." },
      { id: "20-ressembler", fr: "ressembler à", en: "to look like, resemble", ph: "Vous ressemblez à ma fleur." },
      { id: "20-semblable", fr: "semblable", en: "similar, alike", ph: "cinq mille roses, toutes semblables" },
      { id: "20-se-croire-riche", fr: "se croire riche", en: "to believe oneself rich", ph: "Je me croyais riche d'une fleur unique." },
      { id: "20-malheureux", fr: "malheureux", en: "unhappy", ph: "Et il se sentit très malheureux." },
      { id: "20-herbe", fr: "l'herbe (f)", en: "the grass", ph: "Et, couché dans l'herbe, il pleura." },
      { id: "20-couche", fr: "couché", en: "lying down", ph: "couché dans l'herbe" },
      { id: "20-vexe", fr: "vexé", en: "vexed, offended", ph: "Elle serait bien vexée si elle voyait ça…" },
      { id: "20-tousser", fr: "tousser", en: "to cough", ph: "Elle tousserait énormément." },
      { id: "20-faire-semblant", fr: "faire semblant", en: "to pretend", ph: "Elle ferait semblant de mourir pour échapper au ridicule." },
    ]
  },
  {
    n: 21, title: "XXI · Le renard", emoji: "🦊",
    cards: [
      { id: "21-renard", fr: "un renard", en: "a fox", ph: "Je suis un renard, dit le renard." },
      { id: "21-apprivoiser", fr: "apprivoiser", en: "to tame", ph: "Qu'est-ce que signifie « apprivoiser » ?" },
      { id: "21-liens", fr: "créer des liens", en: "to create ties, to bond", ph: "Ça signifie « créer des liens »." },
      { id: "21-chasseur", fr: "un chasseur", en: "a hunter", ph: "Les hommes ont des fusils et ils chassent. C'est bien gênant !" },
      { id: "21-fusil", fr: "un fusil", en: "a gun, a rifle", ph: "Les hommes ont des fusils." },
      { id: "21-poule", fr: "une poule", en: "a hen", ph: "Ils élèvent aussi des poules. C'est leur seul intérêt." },
      { id: "21-elever", fr: "élever", en: "to raise (animals)", ph: "Ils élèvent aussi des poules." },
      { id: "21-ble", fr: "le blé", en: "wheat", ph: "Les champs de blé ne me rappellent rien." },
      { id: "21-dore", fr: "doré", en: "golden", ph: "Le blé, qui est doré, me fera souvenir de toi." },
      { id: "21-ennuyer", fr: "s'ennuyer", en: "to be bored", ph: "Je m'ennuie donc un peu." },
      { id: "21-rite", fr: "un rite", en: "a rite, a ritual", ph: "Il faut des rites." },
      { id: "21-patient", fr: "patient", en: "patient", ph: "Il faut être très patient, répondit le renard." },
      { id: "21-secret", fr: "un secret", en: "a secret", ph: "Voici mon secret. Il est très simple." },
      { id: "21-coeur", fr: "le cœur", en: "the heart", ph: "On ne voit bien qu'avec le cœur." },
      { id: "21-invisible", fr: "invisible", en: "invisible", ph: "L'essentiel est invisible pour les yeux." },
      { id: "21-responsable", fr: "responsable", en: "responsible", ph: "Tu deviens responsable pour toujours de ce que tu as apprivoisé." },
      { id: "21-perdre-temps", fr: "perdre du temps", en: "to spend (lose) time", ph: "C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante." },
    ]
  },
  {
    n: 22, title: "XXII · L'aiguilleur", emoji: "🚂",
    cards: [
      { id: "22-aiguilleur", fr: "un aiguilleur", en: "a railway switchman", ph: "Je trie les voyageurs, par paquets de mille." },
      { id: "22-trier", fr: "trier", en: "to sort", ph: "Je trie les voyageurs." },
      { id: "22-voyageur", fr: "un voyageur", en: "a traveler", ph: "J'expédie les trains qui les emportent." },
      { id: "22-rapide", fr: "un rapide", en: "an express train", ph: "Un rapide illuminé, grondant comme le tonnerre" },
      { id: "22-illumine", fr: "illuminé", en: "lit up", ph: "un rapide illuminé" },
      { id: "22-gronder", fr: "gronder", en: "to rumble, to roar", ph: "grondant comme le tonnerre" },
      { id: "22-tonnerre", fr: "le tonnerre", en: "thunder", ph: "comme le tonnerre" },
      { id: "22-poursuivre", fr: "poursuivre", en: "to chase, pursue", ph: "Ils poursuivent les premiers voyageurs ?" },
      { id: "22-dormir", fr: "dormir", en: "to sleep", ph: "Ils dorment là-dedans, ou bien ils bâillent." },
      { id: "22-ecraser-nez", fr: "écraser son nez contre la vitre", en: "to press one's nose against the window", ph: "Il n'y a que les enfants qui écrasent leur nez contre les vitres." },
      { id: "22-vitre", fr: "une vitre", en: "a window pane", ph: "contre les vitres" },
      { id: "22-poupee", fr: "une poupée de chiffons", en: "a rag doll", ph: "Ils perdent du temps pour une poupée de chiffons." },
      { id: "22-chance", fr: "avoir de la chance", en: "to be lucky", ph: "Ils ont de la chance, dit l'aiguilleur." },
    ]
  },
  {
    n: 23, title: "XXIII · Le marchand de pilules", emoji: "💊",
    cards: [
      { id: "23-marchand", fr: "un marchand", en: "a merchant", ph: "un marchand de pilules perfectionnées" },
      { id: "23-pilule", fr: "une pilule", en: "a pill", ph: "On en avale une par semaine." },
      { id: "23-perfectionne", fr: "perfectionné", en: "improved, advanced", ph: "des pilules perfectionnées" },
      { id: "23-apaiser", fr: "apaiser", en: "to quench, to soothe", ph: "des pilules qui apaisent la soif" },
      { id: "23-soif", fr: "la soif", en: "thirst", ph: "On n'éprouve plus le besoin de boire." },
      { id: "23-eprouver", fr: "éprouver", en: "to feel, experience", ph: "On n'éprouve plus le besoin de boire." },
      { id: "23-besoin", fr: "le besoin", en: "the need", ph: "le besoin de boire" },
      { id: "23-epargner", fr: "épargner", en: "to save (time/money)", ph: "On épargne cinquante-trois minutes par semaine." },
      { id: "23-depenser", fr: "dépenser", en: "to spend", ph: "Si j'avais cinquante-trois minutes à dépenser…" },
      { id: "23-doucement", fr: "tout doucement", en: "very slowly, leisurely", ph: "Je marcherais tout doucement vers une fontaine." },
      { id: "23-fontaine", fr: "une fontaine", en: "a fountain", ph: "marcher tout doucement vers une fontaine" },
    ]
  },
  {
    n: 24, title: "XXIV · À la recherche d'un puits", emoji: "🏜️",
    cards: [
      { id: "24-goutte", fr: "une goutte", en: "a drop", ph: "J'avais bu la dernière goutte de ma provision d'eau." },
      { id: "24-provision", fr: "une provision", en: "a supply, a stock", ph: "ma provision d'eau" },
      { id: "24-puits", fr: "un puits", en: "a well", ph: "Il est absurde de chercher un puits, au hasard, dans l'immensité du désert." },
      { id: "24-hasard", fr: "au hasard", en: "at random", ph: "chercher un puits au hasard" },
      { id: "24-immensite", fr: "l'immensité (f)", en: "the vastness, immensity", ph: "dans l'immensité du désert" },
      { id: "24-avoir-soif", fr: "avoir soif", en: "to be thirsty", ph: "J'ai soif aussi… cherchons un puits…" },
      { id: "24-embellir", fr: "embellir", en: "to make beautiful", ph: "Ce qui embellit le désert, c'est qu'il cache un puits quelque part…" },
      { id: "24-cacher", fr: "cacher", en: "to hide", ph: "Il cache un puits quelque part." },
      { id: "24-enfoui", fr: "enfoui", en: "buried", ph: "un trésor enfoui quelque part" },
      { id: "24-emouvoir", fr: "émouvoir", en: "to move (emotionally)", ph: "Ce qui m'émeut si fort de ce petit prince endormi…" },
      { id: "24-endormir", fr: "s'endormir", en: "to fall asleep", ph: "Comme le petit prince s'endormait, je le pris dans mes bras." },
      { id: "24-fragile", fr: "fragile", en: "fragile", ph: "Les lampes, il faut les protéger : un coup de vent peut les éteindre…" },
    ]
  },
  {
    n: 25, title: "XXV · Le puits", emoji: "⛲",
    cards: [
      { id: "25-poulie", fr: "une poulie", en: "a pulley", ph: "La poulie gémit comme gémit une vieille girouette." },
      { id: "25-gemir", fr: "gémir", en: "to moan, to creak", ph: "La poulie gémit…" },
      { id: "25-girouette", fr: "une girouette", en: "a weathervane", ph: "comme une vieille girouette quand le vent a longtemps dormi" },
      { id: "25-corde", fr: "une corde", en: "a rope", ph: "Tout était prêt : la poulie, le seau et la corde." },
      { id: "25-seau", fr: "un seau", en: "a bucket", ph: "Je hissai le seau jusqu'à la margelle." },
      { id: "25-hisser", fr: "hisser", en: "to hoist, pull up", ph: "Je hissai le seau lentement." },
      { id: "25-chanter", fr: "chanter", en: "to sing", ph: "Tu entends ? Nous réveillons ce puits et il chante…" },
      { id: "25-cadeau", fr: "un cadeau", en: "a gift", ph: "Cette eau était bonne pour le cœur, comme un cadeau." },
      { id: "25-anniversaire", fr: "un anniversaire", en: "an anniversary, birthday", ph: "Demain, c'est l'anniversaire de ma chute sur la Terre." },
      { id: "25-chute", fr: "la chute", en: "the fall", ph: "l'anniversaire de ma chute sur la Terre" },
      { id: "25-museliere", fr: "une muselière", en: "a muzzle", ph: "Tu sais… une muselière pour mon mouton…" },
      { id: "25-rougir", fr: "rougir", en: "to blush", ph: "Le petit prince rougit encore." },
      { id: "25-promesse", fr: "une promesse", en: "a promise", ph: "Tu dois tenir ta promesse, dit doucement le petit prince." },
    ]
  },
  {
    n: 26, title: "XXVI · L'adieu", emoji: "🌠",
    cards: [
      { id: "26-mur", fr: "un mur", en: "a wall", ph: "Il y avait, à côté du puits, une ruine de vieux mur de pierre." },
      { id: "26-venin", fr: "le venin", en: "venom", ph: "Tu as du bon venin ? Tu es sûr de ne pas me faire souffrir longtemps ?" },
      { id: "26-souffrir", fr: "souffrir", en: "to suffer", ph: "ne pas me faire souffrir longtemps" },
      { id: "26-executer", fr: "exécuter", en: "to execute", ph: "un de ces serpents jaunes qui vous exécutent en trente secondes" },
      { id: "26-couler", fr: "couler", en: "to flow, to slip", ph: "Le serpent coula entre les pierres." },
      { id: "26-grelot", fr: "un grelot", en: "a little bell", ph: "des tas de grelots qui savent rire" },
      { id: "26-rire", fr: "rire", en: "to laugh", ph: "Tu auras, toi, des étoiles qui savent rire." },
      { id: "26-ecorce", fr: "une écorce", en: "bark, a shell", ph: "Ce sera comme une vieille écorce abandonnée. Ce n'est pas triste, les vieilles écorces." },
      { id: "26-lourd", fr: "lourd", en: "heavy", ph: "Je ne peux pas emporter ce corps-là. C'est trop lourd." },
      { id: "26-corps", fr: "un corps", en: "a body", ph: "ce corps-là, trop lourd" },
      { id: "26-consoler", fr: "se consoler", en: "to be consoled", ph: "Quand tu seras consolé (on se console toujours)…" },
      { id: "26-tomber-doucement", fr: "tomber doucement", en: "to fall gently", ph: "Il tomba doucement comme tombe un arbre." },
    ]
  },
  {
    n: 27, title: "XXVII · Le plus beau paysage", emoji: "✨",
    cards: [
      { id: "27-paysage", fr: "un paysage", en: "a landscape", ph: "C'est pour moi le plus beau et le plus triste paysage du monde." },
      { id: "27-console", fr: "se consoler un peu", en: "to be somewhat consoled", ph: "Je me suis un peu consolé. C'est-à-dire… pas tout à fait." },
      { id: "27-revenir", fr: "revenir", en: "to come back", ph: "Je sais bien qu'il est revenu à sa planète." },
      { id: "27-courroie", fr: "une courroie", en: "a strap", ph: "Je n'ai jamais pensé à ajouter la courroie de cuir à la muselière !" },
      { id: "27-cuir", fr: "le cuir", en: "leather", ph: "la courroie de cuir" },
      { id: "27-se-demander", fr: "se demander", en: "to wonder", ph: "Je me demande : qu'est-il arrivé sur sa planète ?" },
      { id: "27-changer", fr: "changer", en: "to change", ph: "Et vous verrez comme tout change…" },
      { id: "27-ciel", fr: "le ciel", en: "the sky", ph: "Regardez le ciel. Demandez-vous : le mouton, oui ou non, a-t-il mangé la fleur ?" },
      { id: "27-importance", fr: "l'importance (f)", en: "importance", ph: "Aucune grande personne ne comprendra jamais que ça a tellement d'importance !" },
      { id: "27-envoyer", fr: "envoyer", en: "to send", ph: "Écrivez-moi vite qu'il est revenu…" },
    ]
  },
];
