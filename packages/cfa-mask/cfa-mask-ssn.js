'use strict';

import Cleave from 'cleave.js';

class MaskSSN {
  constructor() {
    let ssns = document.querySelectorAll('[data-js="mask-ssn"]');

    for (let i = 0; i < ssns.length; i++) {
      new Cleave(ssns[i], {
        numericOnly: true,
        blocks: [3, 2, 4],
        delimiters: ['-', '-']
      });
    }
  }
}

export default MaskSSN;