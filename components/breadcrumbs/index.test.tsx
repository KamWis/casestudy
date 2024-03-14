import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe("Breadcrumbs", () => {
  it("Should render no path when user is on the first route", () => {
    mockUsePathname.mockImplementation(() => "/invoice");
    render(<Breadcrumbs />);

    const breadcrumbs = screen.getByTestId("breadcrumbs-component");

    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).not.toHaveTextContent("Invoice");
  });

  it("Should render first two paths if the path is financials/workflows/invoice", () => {
    mockUsePathname.mockImplementation(() => "/financials/workflows/invoice");
    render(<Breadcrumbs />);

    const breadcrumbs = screen.getByTestId("breadcrumbs-component");

    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).not.toHaveTextContent("Invoice");
    expect(breadcrumbs).toHaveTextContent("Financials");
    expect(breadcrumbs).toHaveTextContent("Workflows");
  });

  it("Should render first three paths if the path is financials/workflows/report/invoice", () => {
    mockUsePathname.mockImplementation(
      () => "/financials/workflows/report/invoice"
    );
    render(<Breadcrumbs />);

    const breadcrumbs = screen.getByTestId("breadcrumbs-component");

    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).not.toHaveTextContent("Invoice");
    expect(breadcrumbs).toHaveTextContent("Financials");
    expect(breadcrumbs).toHaveTextContent("Workflows");
    expect(breadcrumbs).toHaveTextContent("Report");
  });

  it("Should contain 3 links when the path is financials/workflows/report/invoice", () => {
    mockUsePathname.mockImplementation(
      () => "/financials/workflows/report/invoice"
    );
    render(<Breadcrumbs />);

    const breadcrumbs = screen.getByTestId("breadcrumbs-component");

    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).not.toContainHTML("/invoice");
    expect(breadcrumbs).toContainHTML("/financials");
    expect(breadcrumbs).toContainHTML("/workflows");
    expect(breadcrumbs).toContainHTML("/report");
  });
});
