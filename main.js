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
  const pAequors = arrOfSurvivors();
  let mostRelatedSpecimens;
  for (let i = 0; i < pAequors.length; i++) {
    for (let j = 1; i < j; j++) {
      if (pAequors[i].compareDNA(j).similarDNApercent > 60) {
        mostRelatedSpecimens = [i, j];
      }
    }
    return mostRelatedSpecimens;
  }
};
