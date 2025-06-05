# 👩‍🎬 TypeScript Actress API

Questo progetto TypeScript ha lo scopo di modellare una struttura dati per rappresentare persone e attrici, e di effettuare chiamate HTTP a una finta API REST per recuperare informazioni in modo sicuro e tipizzato.

---

## 📌 Obiettivo dell’esercizio

1. Creare un type alias `Person` con proprietà specifiche.
2. Estendere `Person` per definire un type alias `Actress`.
3. Implementare funzioni asincrone per interagire con un’API REST:
   - Recupero di una singola attrice (`getActress`)
   - Recupero di tutte le attrici (`getAllActresses`)
   - Recupero di un gruppo di attrici per ID (`getActresses`)
4. Validare la struttura dei dati ricevuti tramite una **type guard** (`isActress`).
5. Utilizzare `Promise.all` per eseguire richieste in parallelo.

---

## 🧱 Type Alias

### `Person`

Rappresenta una persona generica.

```ts
type Person = {
  readonly id: number;        // numero identificativo, non modificabile
  readonly name: string;      // nome completo, non modificabile
  birth_year: number;         // anno di nascita
  death_year?: number;        // anno di morte, opzionale
  biography: string;          // breve biografia
  image: string;              // URL dell’immagine
};
