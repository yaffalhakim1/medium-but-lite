import NewsList from "../pages";
import { render, screen, within } from "@testing-library/react";

test("Pages Router", () => {
  render(<NewsList data={[]} />);
  const main = within(screen.getByRole("main"));
  expect(
    main.getByRole("heading", { level: 1, name: /welcome to next\.js!/i })
  ).toBeDefined();

  const footer = within(screen.getByRole("contentinfo"));
  const link = within(footer.getByRole("link"));
  expect(link.getByRole("img", { name: /vercel logo/i })).toBeDefined();
});
