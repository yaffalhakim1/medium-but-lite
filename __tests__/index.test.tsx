import ProfilePage from "@/pages/profile";
import NewsList from "../pages";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import * as SWR from "swr";
import { INewsElement } from "@/types/news-types";

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

const mockUseSWR = SWR.default as jest.MockedFunction<typeof SWR.default>;
const mockSWRResponse = jest.fn();

describe("Profile Page", () => {
  it("should render profile page", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "",
      phone: "08123456789",
      address: "Jalan Raya",
      isPremiumUser: true,
      subscriptionPlan: {
        id: 1,
        name: "Monthly",
        price: 100000,
        duration: 30,
        expired_date: "2021-10-10",
      },
    };
    mockUseSWR.mockReturnValue({
      data: mockUser,
      error: null,
      mutate: mockSWRResponse,
    } as any);
    render(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("08123456789")).toBeInTheDocument();
      expect(screen.getByText("Jalan Raya")).toBeInTheDocument();
      expect(screen.getByText("Premium")).toBeInTheDocument();
      expect(screen.getByText("Valid until :10/10/2021")).toBeInTheDocument();
    });
  });
});

// describe("News List Page", () => {
//   it("should render news list page", async () => {
//     const mockNews = [
//       {
//         id: 0,
//         isPremium: false,
//         title: "string",
//         desc: "string",
//         img: "string",
//         content: "string",
//         created_at: Date,
//         updated_at: Date,
//         category: "string",
//         likes: [0],
//         shares: 0,
//       },
//     ];

//     mockUseSWR.mockReturnValue({
//       data: mockNews,
//       error: null,
//       mutate: mockSWRResponse,
//     } as any);
//     render(
//       <NewsList
//         data={[
//           {
//             id: 0,
//             isPremium: false,
//             title: "string",
//             desc: "string",
//             img: "string",
//             content: "string",
//             created_at: new Date(),
//             updated_at: new Date(),
//             category: ["", ""],
//             likes: [0],
//             shares: 0,
//           },
//         ]}
//       />
//     );
//     await waitFor(() => {
//       expect(screen.getByText("News Title")).toBeInTheDocument();
//       expect(screen.getByText("News Description")).toBeInTheDocument();
//     });
//   });
// });

describe("Home page", () => {
  it("should call API from swr", async () => {
    const mockNews = [
      {
        id: 0,
        isPremium: false,
        title: "string",
        desc: "string",
        img: "string",
        content: "string",
        created_at: Date,
        updated_at: Date,
        category: "string",
        likes: [0],
        shares: 0,
      },
    ];

    mockUseSWR.mockReturnValue({
      data: mockNews,
      error: null,
      mutate: mockSWRResponse,
    } as any);
    render(<NewsList data={[]} />);
    await waitFor(() => {
      expect(mockUseSWR).toHaveBeenCalled();
    });
  });
});
