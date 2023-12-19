import NewsList from "../pages";
import { render, screen, within } from "@testing-library/react";

test("Pages Router", () => {
  render(<NewsList data={[]} />);
  const section = within(screen.getByRole(""));
  expect(section.getByRole("strong", { name: /News/i })).toBeDefined();

  // const footer = within(screen.getByRole("contentinfo"));
  // const link = within(footer.getByRole("link"));
  // expect(link.getByRole("img", { name: /vercel logo/i })).toBeDefined();
});
