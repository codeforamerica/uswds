import Cleave from 'cleave.js';

class MaskTel {
  constructor() {
    let phones = document.querySelectorAll('[data-js="mask-tel"]');

    for (let i = 0; i < phones.length; i++) {
      new Cleave(phones[i], {
        numericOnly: true,
        blocks: [0, 3, 0, 3, 4],
        delimiters: ['(', ')', ' ', '-']
      });
    }
  }
}

export default MaskTel;