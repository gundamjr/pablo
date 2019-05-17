import {ElementFinder, browser, protractor, by, WebElement, promise, element, Key, $} from 'protractor';
import { utils } from './utils';

export class SimplePage {
  timeout = 30000;

  async cliclarVariosElementos(...menus: ElementFinder[]) {

    await menus.forEach(async(webElemento) => {
      await this.waitPresenceOf(webElemento);
      await this.clickElement(webElemento);

    });
  }
  async checkElementIsDisabled(...elemento: ElementFinder[]) {
    await elemento.forEach(async(webElemento) => {
      await utils.assertEquals(webElemento.getAttribute('disabled'), 'true');
    });
  }
  not(promise) {

    return promise.then((result: any) => {
      return !result;
    });

  }

  async setDropdownByText( dropDown: ElementFinder, htmlOptionType: string, opcaoDropDown: string) {
    await this.clickElement(dropDown);
    await this.clickElement(dropDown.element(by.cssContainingText(`${htmlOptionType}`, opcaoDropDown)));
    await this.clickElement(dropDown);

  }

  async setInput(elementFinder: ElementFinder, value) {
    await this.waitPresenceOf(elementFinder);
    await this.waitVisibilityOf(elementFinder);
    await elementFinder.clear();
    await elementFinder.sendKeys(value);
  }

  disableAngular() {
    return browser.waitForAngularEnabled(false);
  }

  async waitElementToBeClickable(elementFinder: ElementFinder, optMessage ?: string) {

    await browser.wait(
      protractor.ExpectedConditions.visibilityOf(elementFinder),
      this.timeout,
      optMessage
    );
    return await browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(elementFinder),
      this.timeout,
      'ELEMENTO NÃO CLICAVEL'
    );
  }

  async waitVisibilityOf(elementFinder: ElementFinder, optMessage?: string) {
    await browser.wait(
      protractor.ExpectedConditions.visibilityOf(elementFinder),
      this.timeout,
      optMessage
    );
  }

  waitPresenceOf(elementFinder: ElementFinder, optMessage?: string) {
    return  browser.wait(
      protractor.ExpectedConditions.presenceOf(elementFinder),
      this.timeout,
      optMessage
    );
  }

  async waitInvisibilityOf(elementFinder: ElementFinder, optMessage?: string) {
    await this.waitPresenceOf(elementFinder);
    await this.waitVisibilityOf(elementFinder);
    return await browser.wait(
      protractor.ExpectedConditions.invisibilityOf(elementFinder),
      60000,
      'elemento ainda visivel'
    );
  }

  async waitToDisappear(elementFinder: ElementFinder, optMessage?: string) {
    return await browser.wait(async () => {
      return await elementFinder.isPresent().then(async (isPresent) => {
        if (isPresent) {
          return this.not(elementFinder.isDisplayed());
        }else {
          return true;
        }
      });
    }, 30000, optMessage);
  }

  waitForced(timeout: number) {
    return browser.sleep(timeout);
  }

  waitAngular() {
    return  browser.waitForAngular();
  }

  executeScript(script: string | Function) {
    return browser.executeScript(script);
  }

  async elementIsPresent(elementFinder: ElementFinder) {

    return await elementFinder.isPresent();

  }

  getText(elementFinder: ElementFinder) {
    this.waitVisibilityOf(elementFinder);
    return elementFinder.getText().then((text) => {
      return text.replace(/\s/g, ' ');
    });
  }

  pressKey(key: string) {
    return browser.actions().sendKeys(key).perform();
  }

  async getTextSelectedOption(elementFinder: ElementFinder) {

    return await elementFinder.element(by.css('option:checked')).getText();

  }

  async getInputText(elementFinder: ElementFinder) {

    await this.waitVisibilityOf(elementFinder);

    return await elementFinder.getAttribute('value');
  }

  getURLRequest(url: string) {
    return browser.get(url);
  }

  async scrollInto(elementFinder: ElementFinder) {
    await browser.executeScript('arguments[0].scrollIntoView(false);', elementFinder.getWebElement());
    this.waitForced(1000);
  }

  scrollUP() {
    browser.executeScript('window.scrollTo(0,0);');
  }

  async scrollDown() {
    return await browser.executeScript('window.scrollTo(0,10000);');
  }

  async clickElement(elementFinder: ElementFinder, optMessage?: string) {
    await this.waitVisibilityOf(elementFinder);
   return await this.waitElementToBeClickable( elementFinder, optMessage).then(async() => {
        return  elementFinder.click();
    }).catch(async() => {
      await this.scrollInto(elementFinder);
      return  this.clickElement(elementFinder);
    });


  }

  async rightButtonClick(elementFinder: ElementFinder) {

    return await browser.actions().mouseMove(elementFinder).click(protractor.Button.RIGHT).perform();
  }

  doubleClick(elementFinder: ElementFinder) {

    return browser.actions().mouseMove(elementFinder).doubleClick().perform();

  }

  pressESCAPE() {

    return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();

  }


  switchToTab(index: number) {
    return browser.getAllWindowHandles().then((handles) => {
      return browser.switchTo().window(handles[index]);
    });
  }

  refreshPage() {
    browser.navigate().refresh();
  }

  async getUrl() {
    return browser.getCurrentUrl();
  }
}
