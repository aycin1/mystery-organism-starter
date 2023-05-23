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

const pAequorFactory = (specimenNum, dna) => {
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
      return similarDNApercent;
    },
    willLikelySurvive() {
      let counter = 0;
      for (let base in dna) {
        if ((dna[base] === "C") | (dna[base] === "G")) {
          counter += 1;
        }
      }
      const baseCorGPercent = (counter / 15) * 100;
      return baseCorGPercent >= 60 ? true : false;
    },
    complementStrand() {
      const compDNA = [];
      for (let base of dna) {
        if (base === "A") compDNA.push("T");
        else if (base === "C") compDNA.push("G");
        else if (base === "T") compDNA.push("A");
        else if (base === "G") compDNA.push("C");
      }
      return compDNA;
    },
  };
};

const arrOfSurvivors = () => {
  const pAequors = [];
  for (let i = 0; pAequors.length < 30; i++) {
    const pAequor = pAequorFactory(i, mockUpStrand());
    if (pAequor.willLikelySurvive() === true) pAequors.push(pAequor);
  }
  return pAequors;
};

const mostRelatedSpecimens = () => {
  const pAequors = Object.values(arrOfSurvivors());
  let similarDNA = 0;
  let info;
  for (let i = 0; i < pAequors.length; i++) {
    for (let j = i + 1; j < pAequors.length - 1; j++) {
      if (pAequors[i].compareDNA(pAequors[j]) > similarDNA) {
        similarDNA = pAequors[i].compareDNA(pAequors[j]);
        info = `specimen #${pAequors[i].specimenNum} and specimen #${pAequors[j].specimenNum} have ${similarDNA}% of the same DNA, meaning they're the most related`;
      }
    }
  }
  return info;
};
