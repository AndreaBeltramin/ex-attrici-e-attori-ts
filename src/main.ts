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
	nationality: ActressNationalities;
};

type ActressNationalities =
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

function isPerson(dati: unknown): dati is Person {
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
		"image" in dati
	);
}

function isActress(dati: unknown): dati is Actress {
	return (
		isPerson(dati) &&
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

async function getAllActresses(): Promise<Actress[]> {
	try {
		const response = await fetch(
			"https://boolean-spec-frontend.vercel.app/freetestapi/actresses"
		);
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (!(dati instanceof Array)) {
			throw new Error("Formato dei dati non corretto");
		}
		const attriciValide: Actress[] = dati.filter(isActress);
		return attriciValide;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return [];
	}
}

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
	try {
		const promises = ids.map((id) => getActress(id));
		const actresses = await Promise.all(promises);
		return actresses;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return [];
	}
}

function createRandomId() {
	const numeroCasuale = Math.floor(Math.random() * 1000);
	return numeroCasuale;
}

function createActress(data: Omit<Actress, "id">): Actress {
	return {
		...data,
		id: createRandomId(),
	};
}

function updateActress(actress: Actress, updates: Partial<Actress>): Actress {
	return {
		...actress,
		...updates,
		id: actress.id,
		name: actress.name,
	};
}

const actorNationalities: string[] = [
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
	"Scottish",
	"New Zealand",
	"Hong Kong",
	" German",
	"Canadian",
	"Irish",
];

type Actor = Person & {
	known_for: [string, string, string];
	awards: [string] | [string, string];
	nationality:
		| ActressNationalities
		| "Scottish"
		| "New Zealand"
		| "Hong Kong"
		| " German"
		| "Canadian"
		| "Irish";
};

function isActor(dati: unknown): dati is Actor {
	return (
		isPerson(dati) &&
		"known_for" in dati &&
		dati.known_for instanceof Array && //condizione per controllare che sia un array
		dati.known_for.length === 3 && //condizione per controllare che la tuple abbia una lunghezza di 3 elementi
		dati.known_for.every((movie) => typeof movie === "string") && //condizione per controllare se ogni elemento della tuple è una stringa
		"awards" in dati &&
		dati.awards instanceof Array && //condizione per controllare che sia un array
		(dati.awards.length === 1 || dati.awards.length === 2) && //condizione per controllare che la tuple abbia una lunghezza di 2 elementi
		dati.awards.every((award) => typeof award === "string") && //condizione per controllare se ogni elemento della tuple è una stringa
		"nationality" in dati &&
		dati.nationality === "string" &&
		actorNationalities.includes(dati.nationality)
	);
}

async function getActor(id: number): Promise<Actor | null> {
	try {
		const response = await fetch(
			`https://boolean-spec-frontend.vercel.app/freetestapi/actors/${id}`
		);
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (!isActor(dati)) {
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

async function getAllActors(): Promise<Actor[]> {
	try {
		const response = await fetch(
			"https://boolean-spec-frontend.vercel.app/freetestapi/actors"
		);
		if (!response.ok) {
			throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
		}
		const dati: unknown = await response.json();
		if (!(dati instanceof Array)) {
			throw new Error("Formato dei dati non corretto");
		}
		const attoriValidi: Actor[] = dati.filter(isActor);
		return attoriValidi;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return [];
	}
}

async function getActors(ids: number[]): Promise<(Actor | null)[]> {
	try {
		const promises = ids.map((id) => getActor(id));
		const actors = await Promise.all(promises);
		return actors;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dei dati: ", error.message);
		} else {
			console.error("Erorre sconosciuto: ", error);
		}
		return [];
	}
}

function createActor(data: Omit<Actor, "id">): Actor {
	return {
		...data,
		id: createRandomId(),
	};
}

function updateActor(actor: Actor, updates: Partial<Actor>): Actor {
	return {
		...actor,
		...updates,
		id: actor.id,
		name: actor.name,
	};
}

async function createRandomCouple(): Promise<[Actress, Actor] | null> {
	const [actresses, actors] = await Promise.all([
		getAllActresses(),
		getAllActors(),
	]);
	if (actresses.length === 0 || actors.length === 0) {
		return null;
	}
	const randomActress = actresses[Math.floor(Math.random() * actresses.length)];
	const randomActor = actors[Math.floor(Math.random() * actors.length)];
	return [randomActress, randomActor];
}
