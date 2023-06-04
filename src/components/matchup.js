import { types, tc } from "./brain";

function Matchup({pokemon1, pokemon2}){

    const p1 = pokemon1.name;
    const p2 = pokemon2.name;
    const p1t1 = pokemon1.types[0].type.name;
    const p1t2 = pokemon1.types[1] ? pokemon1.types[1].type.name : undefined;
    const p2t1 = pokemon2.types[0].type.name;
    const p2t2 = pokemon2.types[1] ? pokemon2.types[1].type.name : undefined;
    console.log(p1t1, p1t2, p2t1, p2t2)

    function calcMultiplier(atktype, deftype1, deftype2) {
        if (deftype2) {
            return tc[types.indexOf(atktype)][types.indexOf(deftype1)] * tc[types.indexOf(atktype)][types.indexOf(deftype2)];
        } else {
            return tc[types.indexOf(atktype)][types.indexOf(deftype1)];
        }
      }

return (
    <div
    // style={{backgroundColor: 'white', width: 400}}
    >
    <p>{p1t1} hits {p2} for {calcMultiplier(p1t1, p2t1, p2t2)}x damage</p>
    {p1t2 && <p>{p1t2} hits {p2} for {calcMultiplier(p1t2, p2t1, p2t2)}x damage</p>}
    <p>{p2t1} hits {p1} for {calcMultiplier(p2t1, p1t1, p1t2)}x damage</p>
    {p2t2 && <p>{p2t2} hits {p1} for {calcMultiplier(p2t2, p1t1, p1t2)}x damage</p>}
    </div>
)
}

export default Matchup;