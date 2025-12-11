import { describe, test, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Waitlistmodal from "./waitlistmodal"
import apiService from "@/services/apiService"

vi.mock("@/services/apiService", () => ({
    default: {
        post: vi.fn(),
    },
}))

describe("Waitlistmodal", () => {
    const setup = () => {
        const setIsModalOpen = vi.fn()
        render(<Waitlistmodal isModalOpen={true} setIsModalOpen={setIsModalOpen} />)
    }

    test("shows error for invalid email", async () => {
        setup()

        const button = screen.getByText("Get Early Access")
        fireEvent.click(button)

        expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    })

    test("calls API if email valid", async () => {
        setup()

        const input = screen.getByPlaceholderText("Enter Your Email")
        const button = screen.getByText("Get Early Access")

        fireEvent.change(input, { target: { value: "test@test.com" } })
        fireEvent.click(button)

        expect(apiService.post).toHaveBeenCalled()
    })

    test("shows success message", async () => {
        ; (apiService.post as any).mockResolvedValue({ message: "Done!" })

        setup()

        fireEvent.change(screen.getByPlaceholderText("Enter Your Email"), {
            target: { value: "hi@test.com" },
        })

        fireEvent.click(screen.getByText("Get Early Access"))

        expect(await screen.findByText("Done!")).toBeInTheDocument()
    })

    test("shows error from api", async () => {
        ; (apiService.post as any).mockRejectedValue({ message: "Nope" })

        setup()

        fireEvent.change(screen.getByPlaceholderText("Enter Your Email"), {
            target: { value: "good@test.com" },
        })

        fireEvent.click(screen.getByText("Get Early Access"))

        expect(await screen.findByText(/failed/i)).toBeInTheDocument()
    })
})
