"use strict";
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
let compteur = document.querySelector("#compteur");
let i = 0;
const increment = (e) => {
    i++;
    const span = compteur === null || compteur === void 0 ? void 0 : compteur.querySelector("span");
    if (span) {
        span.innerText = i.toString();
    }
};
compteur.addEventListener("click", increment);
/**Narrowing */
/** Grace a type of typescript exclu les type exprimer aux cours du raisonnement, par exemple si dessous dans l' if  l'id est strictement de type number comme id est de type string ou number il sait que dans le else suivant l id sera automatiquement de type string et nous donne donc acces a la fonction uppercase sans erreurs  */
function printId(id) {
    if (typeof id === "number")
        console.log((id * 3).toString());
    else {
        console.log(id.toUpperCase());
    }
}
function example(a, b) {
    if (a === b) {
        /** Type script comprend que a et b sont tous deux de types string */
    }
}
function example2(a) {
    /**  a est soit une date soit une chaine de caractere  */
    if (a instanceof Date) {
        /**a est forcement une date  */
    }
    else {
        /**a est forcement une string  */
    }
}
function example3(a) {
    if (Array.isArray(a)) {
        a[0];
        /**a est forcement un array  */
    }
}
function isDate(a) {
    return a instanceof Date;
}
function example4(a) {
    if ("value" in a) {
        /** ici a est forcement de type htmlInputElement car la proprieter Mouse Event n as pas de propriete value accessible  */
    }
    if (isDate(a)) {
        a;
    }
}
/**L'ajout du ! a la fin de l'expression signifie que cette valeur ne sera pas null,  il permet d'"eliminer" la possibilite que compteur2 soit null */
const compteur2 = document.querySelector("#compteur");
const user = {
    firstname: "john",
    lastname: "doe",
};
function consoleSize(arg) {
    console.log(arg.length);
    return arg;
}
const exConsoleSize = consoleSize(["3", 2]);
function identity(arg) {
    return arg;
}
const ex = identity(3);
function first(arg) {
    return arg[0];
}
const ex1 = first(["as", "bs", "cs"]);
compteur = document.querySelector("#compteur");
const ab = ["aze", "cze", 3];
const user2 = {
    firstname: "john",
    lastname: "doe",
    age: 32,
};
/** Proprieté ReadOnly
 * Function non valide car elle modifie un tableau en lecture seul
 */
// function reverse<T>(arr:readonly T[]): T[] {
//   return arr.reverse();
// }
/** correctif : Le spread operator nous permet de recuperer les donner d un tableau et d'en creer un autre, donc on ne modifie plus le tableau en redonly mais une nouvelle copie de celui ci   */
function reverse(arr) {
    return [...arr].reverse();
}
/** Les classes */
class A {
    constructor() {
        /** la proprieter ayant une visibilité privée ne sera disponible qu'a l'interieure de la classe */
        this.a = 3;
        this.b = 4;
        this.c = 5;
    }
    log() {
        console.log(this.a);
    }
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
    constructor(a) {
        this.a = a;
    }
}
const E = new D(4);
/**Typer les classes
 */
class Collection {
    constructor(items) {
        this.items = items;
    }
    add(item) {
        this.items.push(item);
        return this;
    }
    first() {
        return this.items[0] || null;
    }
    isEqual(a) {
        return a.items === this.items;
    }
}
class SubCollection extends Collection {
    constructor() {
        super(...arguments);
        this.z = 4;
    }
}
const a = new Collection([1, 2]);
const b = a.first();
const c = a.add(3);
const d = new Collection([1, 2]);
/**Exemple */
class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class geometrie {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.surface = 0;
    }
}
function getX(p) {
    return p.x;
}
getX(new geometrie());
/**Les classes abstraite permettent de creer des models de classe qui devront etre respecter par les classes enfants
 * cela permet de forcer l'implementation de certaines propriete et/ou methode
 */
class geometrie2 {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class triangle extends geometrie2 {
    constructor() {
        super(...arguments);
        this.x = 2;
        this.y = 2;
    }
    surface() {
        return 3;
    }
}
