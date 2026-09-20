import { test } from "@playwright/test";
import { Home } from "../page-objects/pages/Home";

test("TL-19-1 check item creation", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST1");
  await item1.checkItemVisible(true);
});

test("TL-19-2 check 2 items creation", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST 1");
  await item1.checkItemVisible(true);
  const item2 = await home.createItem("TEST 2");
  await item2.checkItemVisible(true);
  await home.checkCountOfItems(2);
});

test("TL-19-3 check item completed", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST1");
  await item1.checkItemVisible(true);
  await item1.checkIsMarked(false);
  await item1.markAsCompleted();
  await item1.checkIsMarked(true);
});

test("TL-19-4 check item deletion", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST1");
  await item1.checkItemVisible(true);
  await item1.deleteItem();
  await item1.checkItemVisible(false);
});

test("TL-19-5 check completed items cleared", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST1");
  const item2 = await home.createItem("TEST 2");
  await item1.checkItemVisible(true);
  await item2.checkItemVisible(true);
  await home.checkCountOfItems(2);
  await item2.markAsCompleted();
  await item2.checkIsMarked(true);
  await home.clickClearCompleted();
  await home.checkCountOfItems(1);
});

test("TL-19-6 check filter active", async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  const item1 = await home.createItem("TEST 1");
  const item2 = await home.createItem("TEST 2");
  const item3 = await home.createItem("TEST 3");
  await item1.checkItemVisible(true);
  await item2.checkItemVisible(true);
  await item3.checkItemVisible(true);
  await home.checkCountOfItems(3);
  await item2.markAsCompleted();
  await home.filterActive();
  await home.checkCountOfItems(2);
});
