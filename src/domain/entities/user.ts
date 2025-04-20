export class User {
  private name: String;
  private id: String;

  constructor(id: string, name: string) {
    if (!name) {
      throw new Error("O nome é obrigatório.");
    }
    if (!id) {
      throw new Error("O id é obrigatório.");
    }
    (this.id = id), (this.name = name);
  }

  getId(): String {
    return this.id;
  }

  getName(): String {
    return this.name;
  }
}
