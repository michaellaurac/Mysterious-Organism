const dnaBases = ['A', 'T', 'C', 'G'];

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
  // pAequor factory function
  return {
    specimenNum,  // unique number
    dna,          // array of A, T, C, G base
    mutate() {    // modifies one base in the array by one of the remaining three
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const mutatingBase = this.dna[randomIndex];
      const remainingDNABases = dnaBases.filter( base => base !== mutatingBase); // slice(dnaBases.indexOf(base), 1);
      const newBase = remainingDNABases[Math.floor(Math.random() * remainingDNABases.length)];
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) { // compares the bases of two DNA array of the same length and returns a sentence including the percentage of common DNA
      if (pAequor instanceof Object && typeof pAequor.specimenNum === 'number' && pAequor.dna instanceof Array && this.dna.length === pAequor.dna.length) {
        const percentageCommonDNA = Math.round(this.dna.filter( (base, index) => base === pAequor.dna[index] ).length * 100 / this.dna.length);
        return `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentageCommonDNA}% in common.`
      } else return 'error';
    }
  };
}

/* Testing pAequorFactory(specimenNum, dna) in particular the methods mutate() and compareDNA() */
const pAequor1 = pAequorFactory(1, mockUpStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor1.compareDNA(pAequor2));
pAequor1.mutate();
console.log(pAequor1.compareDNA(pAequor2));
pAequor1.mutate();
console.log(pAequor1.compareDNA(pAequor2));
pAequor1.mutate();
console.log(pAequor1.compareDNA(pAequor2));










