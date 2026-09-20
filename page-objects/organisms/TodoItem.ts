import { Locator, expect } from "@playwright/test";

export default class TodoItem {
  private readonly source: Locator;
  private readonly view: Locator;
  private readonly completedCheckbox: Locator;
  private readonly itemText: Locator;
  private readonly deleteItemButton: Locator;

  constructor(sourceElement: Locator) {
    this.source = sourceElement;
    this.view = sourceElement.locator(".view");
    this.completedCheckbox = this.view.getByTestId("todo-item-toggle");
    this.itemText = this.view.getByTestId("todo-item-label");
    this.deleteItemButton = this.view.getByTestId("todo-item-button");
  }

  async checkItemVisible(visible = true): Promise<void> {
    await expect(this.view).toBeVisible({ visible });
  }

  async markAsCompleted(): Promise<void> {
    await this.completedCheckbox.click();
  }

  async checkIsMarked(marked: boolean): Promise<void> {
    expect(await this.source.getAttribute("class")).toBe(
      marked ? "completed" : "",
    );
  }

  async deleteItem() {
    await this.view.hover();
    await this.deleteItemButton.click();
  }
}
