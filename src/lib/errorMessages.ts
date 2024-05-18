// errorMessages.ts

const errorMessages: { [key: number]: { message: string; info: string } } = {
  400: {
    message: "Bad Request",
    info: "You just broke the internet. Congrats!",
  },
  401: {
    message: "Unauthorized",
    info: "Access denied! Did you forget your secret handshake?",
  },
  403: {
    message: "Forbidden",
    info: "Nope, not allowed. You're like the forbidden fruit, but less tasty.",
  },
  404: {
    message: "Not Found",
    info: "Ahh, the sweet sound of 404. Like a digital black hole.",
  },
  500: {
    message: "Internal Server Error",
    info: "Oops! Our hamster fell off the wheel. Please wait while we find a replacement.",
  },
  502: {
    message: "Bad Gateway",
    info: "Looks like the gatekeeper took a bathroom break. Try again later.",
  },
  503: {
    message: "Service Unavailable",
    info: "The elves are on strike. We'll get back to work as soon as they finish their demands.",
  },
  504: {
    message: "Gateway Timeout",
    info: "Our carrier pigeons are on vacation. You might want to send a carrier seagull instead.",
  },
};

export default errorMessages;
