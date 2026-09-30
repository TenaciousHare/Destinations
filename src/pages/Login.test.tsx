import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "./Login";

// mockNavigate musi powstać "wcześnie" (vi.mock jest podnoszony na górę pliku)
const { mockNavigate } = vi.hoisted(() => ({ mockNavigate: vi.fn() }));

// zostawiamy prawdziwy react-router, podmieniamy tylko useNavigate
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

// atrapa Firebase — bez inicjalizacji i sieci
vi.mock("../services/firebase", () => ({ auth: {}, db: {} }));
vi.mock("firebase/auth", () => ({ signInWithEmailAndPassword: vi.fn() }));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // czyścimy liczniki wywołań między testami
  });

  it("po poprawnym logowaniu przenosi do /admin", async () => {
    // Arrange: atrapa udaje udane logowanie
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({} as never);
    const user = userEvent.setup();
    render(<Login />);

    // Act: użytkownik wypełnia formularz i klika
    await user.type(
      screen.getByPlaceholderText("Adres E-mail"),
      "test@ktw.com",
    );
    await user.type(screen.getByPlaceholderText("Hasło"), "haslo123");
    await user.click(screen.getByRole("button", { name: /zaloguj/i }));

    // Assert: nastąpiła nawigacja do panelu
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/admin"));
  });

  it("po błędnym logowaniu pokazuje komunikat i nie nawiguje", async () => {
    // Arrange: atrapa udaje błąd; wyciszamy console.error z komponentu
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(
      new Error("auth"),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Login />);

    // Act
    await user.type(screen.getByPlaceholderText("Adres E-mail"), "zly@ktw.com");
    await user.type(screen.getByPlaceholderText("Hasło"), "zlehaslo");
    await user.click(screen.getByRole("button", { name: /zaloguj/i }));

    // Assert: widać komunikat błędu, brak nawigacji
    expect(
      await screen.findByText("Nieprawidłowy email lub hasło."),
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
