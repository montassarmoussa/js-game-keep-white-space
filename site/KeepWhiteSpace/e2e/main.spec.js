const {test, expect} = require('@playwright/test');
// test numéro 1
test('Test numero 1 pour voir si il y un titre notre page principal au cas contraire erreur', async ({page}) => {
  await page.goto('/');
  // vérifier que le titre de la page contient au moins un caractère
  await expect(page).toHaveTitle(/./);
});

// test numéro 2

test('test numéro 2  Say hello to my little friend !', async ({page}) => {
  // le test va duré 10 seconde
  test.setTimeout(10000);
  // aller sur la page d'accueil
  await page.goto('/');
  // attend 2 seconde avant d'appuier sur espace sa evite d'appuie espace trop rapidement et de ne pas pouvoir lancer le jeux
  await page.waitForTimeout(2000);
  await page.keyboard.press('Space');


  const duree = 5000; // 5 secondes
  const depart = Date.now();

  while (Date.now() - depart < duree) {
    // simuler les touches pour voir si le "personnage" bouge
    await page.keyboard.down('ArrowUp');
    await page.keyboard.down('ArrowLeft');
  }
});

test('vzerifié que le timer démmare bien ', async ({page}) => {
  await page.goto('/');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);

  const t1 = await page.evaluate(() => Date.now() - gameStatus.startTime);
  await page.waitForTimeout(1000);
  const t2 = await page.evaluate(() => Date.now() - gameStatus.startTime);

  expect(t2).toBeGreaterThan(t1);
});

