import { describe, it, expect } from "vitest";
import { REGEXP } from "./constants";

describe("REGEXP.email", () => {
  it("debería aceptar emails alfanuméricos válidos", () => {
    const validEmails = [
      "abcd@domain.com",
      "abcd123@server.net",
      "testuser123@sub.domain.org",
      "john_doe@domain.com",
      "user-name@domain.co.uk",
      "name.lastname@domain.io",
    ];
    validEmails.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(true);
    });
  });

  it("debería aceptar emails válidos con guiones bajos y puntos", () => {
    const validEmails = [
      "abcd.fgh@domain.com",
      "abcd_fgh@domain.com",
      "abcd-fgh@domain.com",
      "abcd.fgh-ijk@domain.com",
      "abcd_fgh.ijk@domain.com",
    ];
    validEmails.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(true);
    });
  });

  it("debería rechazar emails con menos de 4 caracteres antes de @", () => {
    const tooShort = [
      "a@domain.com",
      "ab@domain.com",
      "abc@domain.com",
    ];
    tooShort.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(false);
    });
  });

  it("debería rechazar emails con espacios", () => {
    const withSpaces = [
      "abc d@domain.com",
      " abcd@domain.com",
      "abcd @domain.com",
      "abcd@ domain.com",
      "abcd@domain .com",
      "abcd@do main.com",
      "abc d@do main.com",
    ];
    withSpaces.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(false);
    });
  });

  it("debería rechazar emails con caracteres inválidos", () => {
    const invalidChars = [
      "abcd!@domain.com",
      "abcd$@domain.com",
      "abcd%25@domain.com",
      "abcd@@domain.com",
      "abcd@domain..com",
      "abcd@domain,com",
      "abcd@domain com",
    ];
    invalidChars.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(false);
    });
  });

  it("debería rechazar emails con punto inicial o final en la parte local", () => {
    const invalidDots = [
      ".abcd@domain.com",
      "abcd.@domain.com",
      ".abcd.@domain.com",
    ];
    invalidDots.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(false);
    });
  });

  it("debería aceptar dominios con múltiples niveles válidos", () => {
    const validMultiDomain = [
      "abcd@domain.com",
      "abcd@sub.domain.com",
      "abcd@sub.sub2.domain.co.uk",
    ];
    validMultiDomain.forEach(email => {
      expect(REGEXP.email.test(email)).toBe(true);
    });
  });
});