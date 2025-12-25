// Configuration du canvas
const canvas = document.getElementById('monCanvas');
const ctx = canvas.getContext('2d');
let imageChargee = false;

// Charger l'image template
const img = new Image();
img.src = 'template-sms.png'; // 👈 CHANGE LE NOM DE TON IMAGE ICI

// Configuration des zones de texte
// 👇 REMPLACE CES COORDONNÉES PAR CELLES QUE TU AS DANS FIGMA
const zones = [
    {
        id: 'texte1',
        x: 337,  // Position X depuis Figma
        y: 398,  // Position Y depuis Figma
        style: 'P2'
    },
    {
        id: 'texte2',
        x: 664,
        y: 460,
        style: 'P1'
    },
    {
        id: 'texte3',
        x: 374,
        y: 555,
        style: 'P1'
    },
    {
        id: 'texte4',
        x: 103,
        y: 691,
        style: 'P1'
    },
    {
        id: 'texte5',
        x: 291,
        y: 691,
        style: 'P1'
    },
    {
        id: 'texte6',
        x: 393,
        y: 691,
        style: 'P1'
    }
];

// Quand l'image est chargée
img.onload = function() {
    imageChargee = true;
    ctx.drawImage(img, 0, 0);
    console.log("✅ Image template chargée !");
};

// Gestion d'erreur si l'image ne charge pas
img.onerror = function() {
    alert("❌ Erreur : impossible de charger l'image 'template-sms.png'\n\nVérifie que l'image est bien dans le même dossier que les fichiers HTML/CSS/JS");
};

// Fonction pour appliquer les styles de texte
function appliquerStyle(ctx, style) {
    // Style P1 : Blanc 28px
    if (style === 'P1') {
        ctx.font = '26px Inter';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top'; // Pour matcher les coordonnées Figma
    } 
    // Style P2 : Gris 23px
    else if (style === 'P2') {
        ctx.font = '22px Inter';
        ctx.fillStyle = '#929197';
        ctx.textBaseline = 'top'; // Pour matcher les coordonnées Figma
    }
}

// Fonction pour générer le meme
function genererMeme() {
    // Vérifier que l'image est chargée
    if (!imageChargee) {
        alert("⏳ Attends que l'image soit chargée !");
        return;
    }
    
    // Effacer le canvas et redessiner l'image de base
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    
    // Ajouter chaque texte sur l'image
    zones.forEach(zone => {
        const inputElement = document.getElementById(zone.id);
        const texte = inputElement.value.trim();
        
        // Si il y a du texte, on l'ajoute
        if (texte) {
            // Appliquer le bon style (P1 ou P2)
            appliquerStyle(ctx, zone.style);
            
            // Dessiner le texte aux coordonnées
            ctx.fillText(texte, zone.x, zone.y);
        }
    });
    
    console.log("✅ BMG généré avec succès !");
}

// Fonction pour télécharger l'image
function telecharger() {
    // Vérifier qu'il y a quelque chose à télécharger
    if (!imageChargee) {
        alert("⏳ Génère d'abord ton BMG !");
        return;
    }
    
    // Créer un lien de téléchargement
    const link = document.createElement('a');
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}_${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}`;
    
    link.download = `meme-sms_${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    console.log("✅ Image téléchargée !");
}

// Event listeners pour les boutons
document.getElementById('generer-btn').addEventListener('click', genererMeme);
document.getElementById('telecharger-btn').addEventListener('click', telecharger);

// Générer automatiquement quand on tape du texte (optionnel)
// Décommente ces lignes si tu veux un aperçu en temps réel
/*
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (imageChargee) {
            genererMeme();
        }
    });
});
*/

// Message de bienvenue dans la console
console.log("🚀 Générateur de BMG chargé !");
console.log("📝 N'oublie pas de :");
console.log("1. Mettre ton image 'template-sms.png' dans le même dossier");
console.log("2. Remplacer les coordonnées X/Y par celles de Figma (ligne 11-47)");
console.log("3. Ajuster les styles P1/P2 si besoin (ligne 63-75)");