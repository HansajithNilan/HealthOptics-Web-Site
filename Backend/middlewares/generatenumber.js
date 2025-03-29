
export function generateNumber(req, res, next) {
    const randomNumber = Math.floor(Math.random() * 1000);
    req.body.randomnumber = randomNumber; // Add to body instead of replacing it
    console.log("Generated Number:", randomNumber);
    next();
  }
  