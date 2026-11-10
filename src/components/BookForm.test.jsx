import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookForm from "./BookForm";
import { describe, test, expect } from "vitest";

describe("BookForm", () => {
    test("shows validation errors when required fields are empty", async () => {
        const user = userEvent.setup();
        render(<BookForm book={null} onSaved={() => {}} />);
        const submitButton = screen.getByRole("button", {
            name: /add book/i,
        });
        await user.click(submitButton);
        expect(screen.getByLabelText(/title/i)).toBeInvalid();
        expect(screen.getByLabelText(/author/i)).toBeInvalid();
        expect(screen.getByLabelText(/price/i)).toBeInvalid();
    });
});