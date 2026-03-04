describe('Product Explorer', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show product list on launch', async () => {
    await expect(element(by.id('product-list'))).toBeVisible();
  });

  it('should open product detail when tapping a product', async () => {
    await waitFor(element(by.id('product-card-1')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('product-card-1')).tap();
    await expect(element(by.id('product-detail-scroll'))).toBeVisible();
  });

  it('should add product to favorites and persist state', async () => {
    await waitFor(element(by.id('product-card-1')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('product-card-1')).tap();
    await element(by.id('detail-favorite-button')).tap();
    await expect(element(by.text('Saved to Favorites'))).toBeVisible();

    // Verify persistence - go back and reopen
    await device.pressBack();
    await element(by.id('product-card-1')).tap();
    await expect(element(by.text('Saved to Favorites'))).toBeVisible();
  });
});