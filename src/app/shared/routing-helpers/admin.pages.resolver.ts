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

  static editorialBoard(): AdminPage {
    return {
      title: 'Rada Redakcyjna',
      url: 'editorial-board'
    };
  }

  static scientificBoard(): AdminPage {
    return {
      title: 'Rada Naukowa',
      url: 'scientific-board'
    };
  }

  static reviewers(): AdminPage {
    return {
      title: 'Recenzenci',
      url: 'reviewers'
    };
  }

}
