# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: main.spec.js >> le player bouge quand on appuie sur ArrowRight
- Location: e2e/main.spec.js:43:1

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 360
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | // test numéro 1                                                                                                                        
  3  | test('Test numero 1 pour voir si il y un titre notre page principal au cas contraire erreur', async ({ page }) => {
  4  |     await page.goto('/');
  5  |     // vérifier que le titre de la page contient au moins un caractère
  6  |     await expect(page).toHaveTitle(/./)
  7  | });
  8  | 
  9  | // test numéro 2 
  10 | 
  11 | test('test numéro 2  Say hello to my little friend !', async ({ page }) => {
  12 |     // le test va duré 10 seconde 
  13 |     test.setTimeout(10000);
  14 |     // aller sur la page d'accueil
  15 |     await page.goto('/');
  16 |     // attend 2 seconde avant d'appuier sur espace sa evite d'appuie espace trop rapidement et de ne pas pouvoir lancer le jeux 
  17 |     await page.waitForTimeout(2000);
  18 |     await page.keyboard.press('Space');
  19 | 
  20 | 
  21 |     const duree = 5000; // 5 secondes
  22 |     const depart = Date.now();
  23 | 
  24 |     while (Date.now() - depart < duree) {
  25 |         //simuler les touches pour voir si le "personnage" bouge 
  26 |         await page.keyboard.down('ArrowUp');
  27 |         await page.keyboard.down('ArrowLeft');
  28 |     }
  29 | });
  30 | 
  31 | test('le timer avance après démarrage du jeu', async ({ page }) => {
  32 |     await page.goto('/');
  33 |     await page.keyboard.press('Space');
  34 |     await page.waitForTimeout(500);
  35 | 
  36 |     const t1 = await page.evaluate(() => Date.now() - gameStatus.startTime);
  37 |     await page.waitForTimeout(1000);
  38 |     const t2 = await page.evaluate(() => Date.now() - gameStatus.startTime);
  39 | 
  40 |     expect(t2).toBeGreaterThan(t1);
  41 | });
  42 | 
  43 | test('le player bouge quand on appuie sur ArrowRight', async ({ page }) => {
  44 |     await page.goto('/');
  45 | 
  46 |     await page.keyboard.press('Space');
  47 |     await page.waitForTimeout(500);
  48 | 
  49 |     const xAvant = await page.evaluate(() => player.p.x);
  50 | 
  51 |     await page.keyboard.down('ArrowRight');
  52 |     await page.waitForTimeout(1000);
  53 |     await page.keyboard.up('ArrowRight');
  54 | 
  55 |     const xApres = await page.evaluate(() => player.p.x);
  56 | 
> 57 |     expect(xApres).not.toBe(xAvant);
     |                        ^ Error: expect(received).not.toBe(expected) // Object.is equality
  58 | });
```