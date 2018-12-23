export interface MenuItem {
  title: string;
  url: string;
}

export type MenuItems = MenuItem[];

export class Menu {

  private menuItems: MenuItems = [];

  get items(): MenuItems {
    return this.menuItems;
  }

  withPage(page: MenuItem): Menu {
    this.menuItems.push({
      ...page,
      url: `/${page.url}`
    });
    return this;
  }

}
