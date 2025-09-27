class DeltagerManager {
    constructor(root) {
        this.root = root;
        this.deltagere = [];
        
        // Henter input
        this.startNummer = document.getElementById("startnummer");
        this.deltagerNavn = document.getElementById("deltagernavn");
        this.sluttid = document.getElementById("sluttid");

        // Henter knapper
        this.registrer = this.root.querySelector(".registrering button");
        this.visResultat = this.root.querySelector(".resultat button");

        // Henter output
        this.melding = this.root.querySelector(".registrering p");
        this.meldingSpans = this.melding.querySelectorAll("p.hidden span");

        this.resultatTbody = this.root.querySelector(".resultat tbody");
        this.resultatTom = this.root.querySelector(".resultat p");

        // Hendelser
        this.registrer.addEventListener("click", () => this.registrerDeltager());
        this.visResultat.addEventListener("click", () => this.visResultater());
    }

    registrerDeltager() {
		const nummerInput = this.startNummer;          // Selve input-elementet, må være RAW om det skal valideres
		const nummer = this.startNummer.value.trim();  /* Fjerner white-space OG konverterer til String, 
	 												      for å brukes i tekst */
		
        const navnInput = this.deltagerNavn;
        const tid = this.sluttid.value.trim();

        // Sjekker om alt er fylt ut
        if (!nummer || !navnInput.value.trim() || !tid) {
            alert("Fyll ut alle felt");
            return;
        }

        // Sjekker om HTML-valideringen er oppfylt
        if (!navnInput.checkValidity()) {
            navnInput.reportValidity();
            return;
        }
		// sjekk om startnummer finnes fra før
		if (this.deltagere.some(d => d.nummer === nummer)) {
			 nummerInput.setCustomValidity("Dette startnummeret er allerede registrert.");
			 nummerInput.reportValidity();
			 nummerInput.focus();
			 return;
		 }

        // Rydd opp og formater navn
        const navn = this.capitalizeWords(navnInput.value.trim());

        // Legg til deltager
        const deltager = { nummer, navn, tid };
        this.deltagere.push(deltager);

        // Vis på skjermen
        this.meldingSpans[0].textContent = navn;
        this.meldingSpans[1].textContent = nummer;
        this.meldingSpans[2].textContent = tid;
        this.melding.classList.remove("hidden");

        // Nullstill inputfeltene
        this.startNummer.value = "";
        this.deltagerNavn.value = "";
        this.sluttid.value = "";
    }
	

    visResultater() {
        this.resultatTbody.innerHTML = "";

        if (this.deltagere.length === 0) {
            this.resultatTom.style.display = "block";
            return;
        }

        this.resultatTom.style.display = "none";

        const sorterte = [...this.deltagere].sort((a, b) => a.tid.localeCompare(b.tid));

        sorterte.forEach((deltager, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${deltager.nummer}</td>
                <td>${deltager.navn}</td>
                <td>${deltager.tid}</td>
            `;
            this.resultatTbody.appendChild(tr);
        });
    }

    //Funksjon for å formatere navn
    capitalizeWords(str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}

const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);