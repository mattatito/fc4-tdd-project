export class Property {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private maxGuest: number,
    private basePricePerNight: number
  ) {
    this.id = id;
    (this.name = name),
      (this.description = description),
      (this.maxGuest = maxGuest);
    this.basePricePerNight = basePricePerNight;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getMaxGuest(): number {
    return this.maxGuest;
  }

  getBasePricePerNight(): number {
    return this.basePricePerNight;
  }
}
