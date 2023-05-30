/** Basic Type */

// const a: string = "Hello World";
// const n: number = 2;
// const bool = true;
// const d: null = null;
// const array: any[] = ["aze", "aze", 3];
// const user: { firstname: string; lastname?: string } = {
//   firstname: "john",
//   //   lastname: "doe",
// };
// const date: Date = new Date();
// const callback: (e: MouseEvent) => void = (e: MouseEvent): void => {};
// function printID(id: number | string): void {
//   console.log(id.toString());
// }

/** Mise En Application */
let compteur = document.querySelector("#compteur") as HTMLButtonElement;
let i = 0;

const increment = (e: Event) => {
  i++;
  const span = compteur?.querySelector("span");
  if (span) {
    span.innerText = i.toString();
  }
};
compteur.addEventListener("click", increment);

/**Narrowing */
/** Grace a type of typescript exclu les type exprimer aux cours du raisonnement, par exemple si dessous dans l' if  l'id est strictement de type number comme id est de type string ou number il sait que dans le else suivant l id sera automatiquement de type string et nous donne donc acces a la fonction uppercase sans erreurs  */
function printId(id: string | number) {
  if (typeof id === "number") console.log((id * 3).toString());
  else {
    console.log(id.toUpperCase());
  }
}

function example(a: string | boolean, b: string | number | boolean) {
  if (a === b) {
    /** Type script comprend que a et b sont tous deux de types string */
  }
}

function example2(a: string | Date) {
  /**  a est soit une date soit une chaine de caractere  */
  if (a instanceof Date) {
    /**a est forcement une date  */
  } else {
    /**a est forcement une string  */
  }
}

function example3(a: string | string[]) {
  if (Array.isArray(a)) {
    a[0];
    /**a est forcement un array  */
  }
}

function isDate(a: any): a is Date {
  return a instanceof Date;
}
function example4(a: MouseEvent | HTMLInputElement | Date) {
  if ("value" in a) {
    /** ici a est forcement de type htmlInputElement car la proprieter Mouse Event n as pas de propriete value accessible  */
  }
  if (isDate(a)) {
    a;
  }
}
/**L'ajout du ! a la fin de l'expression signifie que cette valeur ne sera pas null,  il permet d'"eliminer" la possibilite que compteur2 soit null */
const compteur2 = document.querySelector("#compteur")!;

/** Aliaas de type et generique */

/**Alias */
type User = {
  firstname: string;
  lastname: string;
};
const user: User = {
  firstname: "john",
  lastname: "doe",
};
type Id = string | number;

/**Generique */
type Yolo<ArgType> = (arg: ArgType) => ArgType;

function consoleSize<Type extends { length: number }>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
const exConsoleSize = consoleSize(["3", 2]);

function identity<ArgType>(arg: ArgType): ArgType {
  return arg;
}
const ex = identity<number>(3);

function first<Type>(arg: Type[]): Type {
  return arg[0];
}
const ex1 = first(["as", "bs", "cs"]);

compteur = document.querySelector<HTMLButtonElement>("#compteur")!;

const ab: Array<string | number> = ["aze", "cze", 3];

type P = keyof User;

type Username = User["firstname"];

const user2 = {
  firstname: "john",
  lastname: "doe",
  age: 32,
};
type User2 = typeof user;

/** Proprieté ReadOnly
 * Function non valide car elle modifie un tableau en lecture seul
 */

// function reverse<T>(arr:readonly T[]): T[] {
//   return arr.reverse();

// }
/** correctif : Le spread operator nous permet de recuperer les donner d un tableau et d'en creer un autre, donc on ne modifie plus le tableau en redonly mais une nouvelle copie de celui ci   */
function reverse<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}

/** Les classes */

class A {
  /** la proprieter ayant une visibilité privée ne sera disponible qu'a l'interieure de la classe */
  private a = 3;
  log() {
    console.log(this.a);
  }
  protected b = 4;
  c = 5;
}
const Ainstance = new A();
Ainstance.log();

class B extends A {
  /** la proprieter ayant une visibilité protegé  sera egalement disponible aux enfants */
  log2() {
    console.log(this.b);
  }
}
class C extends A {
  /** la proprieter ayant une visibilité public ou non declarer(public par defaut) sera accessible a l interieure de la class, ainsi qu'aux enfants */
  log3() {
    console.log(this.c);
  }
}
/** Pour chaque nouvelle instance de la classe D on demandera un parametre a de tyoe number qui va initialiser la propriété a de la nouvelle classe  */
class D {
  constructor(public a: number) {}
}
const E = new D(4);

/**Typer les classes
 */
class Collection<T> {
  constructor(private items: T[]) {}
  add(item: T): this {
    this.items.push(item);
    return this;
  }

  first(): T | null {
    return this.items[0] || null;
  }
  isEqual(a: this) {
    return a.items === this.items;
  }
}

class SubCollection<T> extends Collection<T> {
  z = 4;
}

const a = new Collection([1, 2]);
const b = a.first();
const c = a.add(3);
const d = new Collection([1, 2]);
/**Exemple */
class Point {
  x = 0;
  y = 0;
}
class geometrie {
  x = 0;
  y = 0;
  surface = 0;
}
function getX(p: Point) {
  return p.x;
}
getX(new geometrie());
/**Les classes abstraite permettent de creer des models de classe qui devront etre respecter par les classes enfants
 * cela permet de forcer l'implementation de certaines propriete et/ou methode
 */

abstract class geometrie2 {
  x = 0;
  y = 0;
  abstract surface(): number;
}
class triangle extends geometrie2 {
  x = 2;
  y = 2;
  surface(): number {
    return 3;
  }
}
