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
        return percentageCommonDNA = this.dna.filter( (base, index) => base === pAequor.dna[index] ).length * 100 / this.dna.length;
      } else return 'error';
    },
    willLikelySurvive() {
      const likelihood = this.dna.filter( base => base === 'C' || base === 'G' ).length * 100 / this.dna.length;
      return likelihood > 60;
    },
    complementaryStrand() {
      return this.dna.map ( base => {
        switch(base) {
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'C':
            return 'G';
            break;
          case 'G':
            return 'C';
            break;
          default:
            return null;
        }
      })
    }
  };
}

function mostRelatedSpecimens(pAequors) {
  // Computes the list of specimen pairs with most related DNA percentage using a double loop on indices
  if (pAequors.length > 2) {
    let mostRelated = [];
    let mostCommonBases = -1;
    let commonBases = -1;
    let pAequorI, pAequorJ;

    for (let i = 0; i < pAequors.length - 1 ; i++) {
      for (let j = i + 1; j < pAequors.length ; j++) {
        pAequorI = pAequors[i];
        pAequorJ = pAequors[j];
        commonBases = pAequorI.compareDNA(pAequorJ);
        if ( commonBases === mostCommonBases ) {
          mostRelated.push([pAequorI, pAequorJ]);
        } else if ( commonBases > mostCommonBases ) {
          mostRelated = [[pAequorI, pAequorJ]];
          mostCommonBases = commonBases;
        }
      }
    }
    let result = `The number of most common bases is ${mostCommonBases}% and can be found between `;
    mostRelated.forEach( (pair, index) => {
      if (mostRelated.length === 1) {
        result += `specimen #${pair[0].specimenNum} and specimen #${pair[1].specimenNum}.`;
      } else {
        if (index < mostRelated.length - 1) {
          result += `specimen #${pair[0].specimenNum} and specimen #${pair[1].specimenNum}, `;
        } else {
          result += `and, specimen #${pair[0].specimenNum} and specimen #${pair[1].specimenNum}.`;
        }
      }
    });
    return result;
  }
}

function mostRelatedSpecimensWithReduce(pAequors) {
  // Computes the list of specimen pairs with most related DNA percentage using a reduce function
  let listUniqueSpecimenPairs = pAequors.reduce( (accumulatedList, pAequorI, index) => 
    accumulatedList.concat(pAequors.slice( index + 1 ).map( pAequorJ => [pAequorI, pAequorJ, pAequorI.compareDNA(pAequorJ)] )),
  []);

  let commonBases = listUniqueSpecimenPairs.map( (commonBaseIJ) => {
    return commonBaseIJ[2];
  });

  let mostCommonBases = Math.max.apply(null, commonBases);
  
  let mostRelated = listUniqueSpecimenPairs.filter( commonBaseIJ => {
    return commonBaseIJ[2] === mostCommonBases;
  });

  let result = `The number of most common bases is ${mostCommonBases}% and can be found between `;
     mostRelated.forEach( (commonBaseIJ, index) => {
       if (mostRelated.length === 1) {
         result += `specimen #${commonBaseIJ[0].specimenNum} and specimen #${commonBaseIJ[1].specimenNum}.`;
       } else {
         if (index < mostRelated.length - 1) {
           result += `specimen #${commonBaseIJ[0].specimenNum} and specimen #${commonBaseIJ[1].specimenNum}, `;
         } else {
           result += `and, specimen #${commonBaseIJ[0].specimenNum} and specimen #${commonBaseIJ[1].specimenNum}.`;
         }
       }
     });
     return result;
}

/* Testing pAequorFactory(specimenNum, dna) in particular the methods:
mutate(), compareDNA(), willLikelySurvive() and complementaryStrand()

const pAequor1 = pAequorFactory(1, mockUpStrand());
console.log(pAequor1.willLikelySurvive());
const pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor2.willLikelySurvive());
console.log(pAequor1.compareDNA(pAequor2));
console.log(pAequor1.dna);
console.log(pAequor1.complementaryStrand());
console.log(pAequor1.willLikelySurvive());
console.log(pAequor1.compareDNA(pAequor2));
pAequor1.mutate();
console.log(pAequor1.willLikelySurvive());
console.log(pAequor1.compareDNA(pAequor2));
pAequor1.mutate();
console.log(pAequor1.willLikelySurvive());
console.log(pAequor1.compareDNA(pAequor2));*/

/* Testing the function mostRelatedSpecimens() */
const pAequorArray = [];
for ( i = 0; i < 5; i++ ) { 
  pAequorArray.push( pAequorFactory(( i + 1 ), mockUpStrand()) ); 
}
console.log(mostRelatedSpecimens(pAequorArray));
console.log(mostRelatedSpecimensWithReduce(pAequorArray));





