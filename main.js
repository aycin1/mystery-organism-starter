const dnaBases = ["A", "T", "C", "G"];

// Returns a random DNA base
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const indexOfBaseToChange = Math.floor(Math.random() * 15);
      const baseOptions = Object.values(dnaBases);
      baseOptions.splice(baseOptions.indexOf(dna[indexOfBaseToChange]), 1);
      dna[indexOfBaseToChange] = baseOptions[Math.floor(Math.random() * 3)];
      return dna;
    },
    compareDNA(pAequor2) {
      let counter = 0;
      for (let base in dna) {
        if (dna[base] === pAequor2.dna[base]) {
          counter += 1;
        }
      }
      const similarDNApercent = (counter / 15) * 100;
      console.log(
        `specimen #${specimenNum} and specimen #${pAequor2.specimenNum} have ${similarDNApercent}% DNA in common`
      );
    },
    willLikelySurvive() {
      let counter = 0;
      for (let base in dna) {
        if ((dna[base] === "C") | (dna[base] === "G")) {
          counter += 1;
        }
      }
      const baseCorGPercent = (counter / 15) * 100;
      return baseCorGPercent > 60 ? true : false;
    },
  };
}

let pAequor1 = pAequorFactory(1, [
  "T",
  "G",
  "A",
  "C",
  "G",
  "C",
  "A",
  "C",
  "C",
  "T",
  "C",
  "T",
  "C",
  "C",
  "A",
]);
let pAequor2 = pAequorFactory(2, [
  "T",
  "G",
  "A",
  "C",
  "G",
  "C",
  "A",
  "C",
  "C",
  "A",
  "C",
  "G",
  "C",
  "C",
  "C",
]);
console.log(pAequor1.willLikelySurvive());
