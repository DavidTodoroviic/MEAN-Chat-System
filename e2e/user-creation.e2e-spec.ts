import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('User Creation E2E Test', () => {
  it('should create a new user', async () => {
    await browser.get('/super-admin');
    await element(by.css('input[name="username"]')).sendKeys('testuser');
    await element(by.css('button[name="createUser"]')).click();
    
    const successMessage = element(by.css('.success-message'));
    await browser.wait(EC.presenceOf(successMessage), 5000);
    
    const isPresent = await successMessage.isPresent();
    expect(isPresent).toBe(true);
  });
});