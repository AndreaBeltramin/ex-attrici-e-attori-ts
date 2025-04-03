type Person = {
	readonly id: number;
	readonly name: string;
	birth_year: number;
	death_year?: number;
	biography: string;
	image: string;
};

type Actress = Person & {
	most_famous_movie: [string, string, string];
	awards: string;
	nationality:
		| "American"
		| "British"
		| "Australian"
		| "Israeli-American"
		| "South African"
		| "French"
		| "Indian"
		| "Israeli"
		| "Spanish"
		| "South Korean"
		| "Chinese";
};

const actressNationalities: string[] = [
	"American",
	"British",
	"Australian",
	"Israeli-American",
	"South African",
	"French",
	"Indian",
	"Israeli",
	"Spanish",
	"South Korean",
	"Chinese",
];

function isActress(dati: unknown): dati is Actress {
	return (
		typeof dati === "object" && //non basta mettere la condizione che sia un oggetto
		dati !== null && //dobbiamo mettere anche la condizione che sia diverso da null perchè null rientra nel tipo oggetto
		"id" in dati && //dobbiamo controllare per ogni dato se il dato esiste dentro l'oggetto
		typeof dati.id === "number" && //e se il tipo del dato sia corretto
		"name" in dati &&
		typeof dati.name === "string" &&
		"birth_year" in dati &&
		typeof dati.birth_year === "number" &&
		"death_year" in dati &&
		typeof dati.death_year === "number" &&
		"biography" in dati &&
		typeof dati.biography === "string" &&
		"image" in dati &&
		typeof dati.image === "string" &&
		"most_famous_movie" in dati &&
		dati.most_famous_movie instanceof Array && //condizione per controllare che sia un array
		dati.most_famous_movie.length === 3 && //condizione per controllare che la tuple abbia una lunghezza di 3 elementi
		dati.most_famous_movie.every((movie) => typeof movie === "string") && //condizione per controllare se ogni elemento della tupla è una stringa
		"awards" in dati &&
		typeof dati.awards === "string" &&
		"nationality" in dati &&
		dati.nationality === "string" &&
		actressNationalities.includes(dati.nationality)
	);
}

async function getActress(id: number): Promise<Actress | null> {
	try {
		const response = await fetch(
			`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`
		);
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (!isActress(dati)) {
			throw new Error("Formato dei dati non corretto");
		}
		return dati;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return null;
	}
}

async function getAllActresses(): Promise<Actress[] | []> {
	try {
		const response = await fetch(
			"https://boolean-spec-frontend.vercel.app/freetestapi/actresses"
		);
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (dati && dati instanceof Array) {
			return dati;
		}
		throw new Error("Formato dei dati non corretto");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return [];
	}
}
