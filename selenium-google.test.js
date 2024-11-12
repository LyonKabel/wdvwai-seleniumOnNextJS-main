require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');


describe('Website tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should open homepage and check the title', async () => {
    await driver.get('http://localhost:3000');
    const homeTitle = await driver.getTitle();
    expect(homeTitle).toBe('Home'); 
  });

  it('should open contact page and check the title', async () => {
    const contactLink = await driver.findElement(By.id('contactLink'));
    await contactLink.click();
    await driver.wait(until.titleIs('Contact Us'), 1000);
    const contactTitle = await driver.getTitle();
    expect(contactTitle).toBe('Contact Us');
  });

  it('should sign up for more info via email and check the message', async () => {
    const inputField = await driver.findElement(By.id('formInput'));
    const submitButton = await driver.findElement(By.id('formSubmit'));

    const testEmail = 'test@example.com';
    await inputField.sendKeys(testEmail);
    await submitButton.click();

    
    await driver.wait(until.elementLocated(By.id('formMessage')), 3000);
    const confirmationMessage = await driver.findElement(By.id('formMessage')).getText();
    expect(confirmationMessage).toBe(`More info coming to ${testEmail}`); 
  });
});
