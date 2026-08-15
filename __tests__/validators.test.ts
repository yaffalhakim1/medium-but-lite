import {
  validateAddress,
  validateConfirmPassword,
  validateContent,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateTitle,
} from "@/lib/helper/validators";

describe("validators", () => {
  describe("validateEmail", () => {
    it("accepts a valid email", () => {
      expect(validateEmail("user@example.com")).toBeNull();
    });

    it("rejects an email without @", () => {
      expect(validateEmail("userexample.com")).toBe(
        "Email must include @ symbol"
      );
    });

    it("rejects an email without a dot", () => {
      expect(validateEmail("user@example")).toBe("Email must include @ symbol");
    });
  });

  describe("validatePassword", () => {
    it("accepts a password of 8+ characters", () => {
      expect(validatePassword("password123")).toBeNull();
    });

    it("rejects short passwords — including non-numeric ones", () => {
      // Regression: `Number("short")` is NaN, and NaN < 8 is false, so the
      // old length check let non-numeric short passwords through.
      expect(validatePassword("short")).toBe("The minimum character is 8");
      expect(validatePassword("1234567")).toBe("The minimum character is 8");
    });
  });

  describe("validateName", () => {
    it("accepts a name of 2+ characters", () => {
      expect(validateName("Yafi")).toBeNull();
    });

    it("rejects a single-character name", () => {
      expect(validateName("Y")).toBe("The minimum character is 2");
    });
  });

  describe("validatePhone", () => {
    it("accepts 10-12 characters", () => {
      expect(validatePhone("08123456789")).toBeNull();
    });

    it("rejects too-short phone numbers", () => {
      expect(validatePhone("0812345")).toBe(
        "The minimum character is 10 and maximum is 12"
      );
    });

    it("rejects too-long phone numbers", () => {
      expect(validatePhone("0812345678901234")).toBe(
        "The minimum character is 10 and maximum is 12"
      );
    });
  });

  describe("validateAddress", () => {
    it("accepts an address of 10+ characters", () => {
      expect(validateAddress("Klipang Permai Blok I")).toBeNull();
    });

    it("rejects a short address", () => {
      expect(validateAddress("Rumah")).toBe("The minimum character is 10");
    });
  });

  describe("validateConfirmPassword", () => {
    it("accepts matching passwords", () => {
      expect(validateConfirmPassword("password123", "password123")).toBeNull();
    });

    it("rejects mismatched passwords", () => {
      expect(validateConfirmPassword("password123", "password124")).toBe(
        "Confirmation password didn't match"
      );
    });
  });

  describe("validateTitle", () => {
    it("accepts a title of up to 20 characters", () => {
      expect(validateTitle("A 20 char title OK")).toBeNull();
    });

    it("rejects a title longer than 20 characters", () => {
      expect(validateTitle("This title is definitely way too long")).toBe(
        "The maximal character is 20"
      );
    });
  });

  describe("validateContent", () => {
    it("accepts content up to 200 characters", () => {
      expect(validateContent("x".repeat(200))).toBeNull();
    });

    it("rejects content longer than 200 characters", () => {
      expect(validateContent("x".repeat(201))).toBe(
        "The maximal character is 200"
      );
    });
  });
});
