export class SessionImage {
  greenPercentage;
  yellowPercentage;
  nakedPercentage;
  cloudinaryUrl;

  constructor(args) {
    Object.assign(this, args);
  }
}
