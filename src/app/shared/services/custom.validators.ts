export class CustomValidators {

  static get issueYear(): RegExp {
    return new RegExp(/[1-9][\d]{3}/);
  }

  static get issueVolume(): RegExp {
    return new RegExp(/[1-9][\d]?/);
  }

  static get issueNumber(): RegExp {
    return CustomValidators.issueVolume;
  }

  static get doi(): RegExp {
    return new RegExp(
      new RegExp(/https:[/][/]doi.org[/]\d*[.]?\d*[/]rs./).source +
      CustomValidators.issueYear.source +
      new RegExp(/[.]\d+/).source
    );
  }

  static get personName(): RegExp {
    return new RegExp(/^([^\u0000-\u007F]|[a-zA-Z])+$/);
  }

  static get pagesInIssue(): RegExp {
    return new RegExp(/\d+(-\d+)?/);
  }

  static get email(): RegExp {
    return new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/);
  }

  static fullMatch(pattern: RegExp): RegExp {
    const start: RegExp = new RegExp(/^/);
    const end: RegExp = new RegExp(/$/);
    return new RegExp(start.source + pattern.source + end.source);
  }

}
