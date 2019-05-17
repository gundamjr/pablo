import { element, by, browser } from 'protractor';
declare const allure: any;
export const  utils = {


  takeShotToReport() {
    browser.takeScreenshot().then(function (png) {
      allure.createAttachment('Screenshot', function () {
        return new Buffer(png, 'base64');
      }, 'image/png')();
    });
  },

  assertEquals(esperado, atual) {
    utils.takeShotToReport();
    return expect(atual).toEqual(esperado);
  },

  assertToContain(atual, contem) {
    return expect(atual).toContain(contem);
  },

  assertNotToContain(atual, contem) {
    return expect(atual).not.toContain(contem);
  },
  assertNotEquals(esperado, atual) {
    return expect(atual).not.toEqual(esperado);
  },

  assertMatch(esperado, atual) {
    return expect(atual).toMatch(esperado);
  },

  async assertTrue(bool) {
    await utils.takeShotToReport();
    return expect(bool).toBe(true);
  },

  assertFalse(bool) {
    return expect(bool).toBe(false);
  },

  assertLessThan(atual, esperado) {
    return expect(atual).toBeLessThan(esperado);
  },

  assertBigThan(atual, esperado) {
    return expect(atual).toBeGreaterThan(esperado);
  },

  assertFail(message) {
    fail(message);
  },

  sum(num1, num2) {
    return (num1 + num2);
  },

  sub(num1, num2) {
    return (num1 - num2);
  },

  prod(num1, num2) {
    return (num1 * num2);
  },

  removePontotraco(string: string) {
    string = string.replace(/\.|\-/g, '');
    return string;
  },

  RemoveSpaces(string: string) {
    string = string.replace(/( )+/g, '');
    return string;
  },

  removeAcento (string) {
    string = string.toLowerCase();
    string = string.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    string = string.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    string = string.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    string = string.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    string = string.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    string = string.replace(new RegExp('[Ç]', 'gi'), 'c');
    return string;
  },

  toLowerCase(text) {
    const words = text.toLowerCase().split(' ');
    for (let a = 0; a < words.length; a++) {
      const w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(' ');
  },

  generateIntNumberString(numeroDeDigitos) {
    const carct = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let numero = '';
    for (let i = 0; i < numeroDeDigitos; i++) {
     const j = Math.floor(Math.random() * carct.length);
     numero += carct[j];
    }
    return numero;
  },
};
