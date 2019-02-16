export type AdminPage = {
  title: string;
  url: string;
};

export class AdminPagesResolver {

  static dashboard(): AdminPage {
    return {
      title: 'Panel Administratora',
      url: 'dashboard'
    };
  }

  static library(): AdminPage {
    return {
      title: 'Zarządzanie numerami',
      url: 'library'
    };
  }

  static editorialBoardEdit(): AdminPage {
    return {
      title: 'Rada Redakcyjna',
      url: 'editorial-board'
    };
  }

}
