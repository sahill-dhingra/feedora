import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        business_name: "",
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccess(false);
        setError("");

        try {
            const { error } = await supabase
                .from("contact_requests")
                .insert({
                    business_name: formData.business_name.trim(),
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || null,
                    message: formData.message.trim(),
                });

            if (error) {
                throw error;
            }

            setSuccess(true);

            setFormData({
                business_name: "",
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact form error:", error);

            setError(
                error?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="min-h-screen overflow-x-hidden bg-white text-[#171717]"
            style={{
                backgroundImage: "url('/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* ================= NAVBAR ================= */}
            <header className="sticky top-0 z-50 border-b border-[#E7E4DF]/70 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                    <Link to="/" className="shrink-0">
                        <img
                            src="/feedora.png"
                            alt="Feedora"
                            className="h-9 w-auto sm:h-10"
                        />
                    </Link>

                    <nav className="flex items-center gap-3 sm:gap-6">
                        <Link
                            to="/"
                            className="hidden text-sm font-medium text-gray-600 transition hover:text-[#004AAD] sm:block"
                        >
                            Home
                        </Link>

                        <a
                            href="/#how-it-works"
                            className="hidden text-sm font-medium text-gray-600 transition hover:text-[#004AAD] sm:block"
                        >
                            How it works
                        </a>

                        {/* <Link
                            to="/contact"
                            className="rounded-full bg-[#004AAD] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#003B8F]"
                        >
                            Get Started
                        </Link> */}
                    </nav>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main>
                <section className="px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
                    <div className="mx-auto max-w-6xl">
                        {/* Heading */}
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="mb-2 text-xl font-semibold uppercase tracking-[0.2em] text-[#004AAD]">
                                GET IN TOUCH
                            </p>

                            <h1 className="text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
                                Ready to make customer
                                <span className="text-[#004AAD]">
                                    {" "}feedback more useful?
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                                Tell us a little about your business and
                                we'll get back to you about Feedora.
                            </p>
                        </div>

                        {/* Form area */}
                        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
                            <div className="rounded-3xl border border-[#E7E4DF] bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {/* Business name */}
                                        <div>
                                            <label
                                                htmlFor="business_name"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Business Name
                                            </label>

                                            <input
                                                id="business_name"
                                                name="business_name"
                                                type="text"
                                                value={
                                                    formData.business_name
                                                }
                                                onChange={handleChange}
                                                required
                                                placeholder="Your business name"
                                                className="w-full rounded-xl border border-[#E1E1E1] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#004AAD] focus:ring-4 focus:ring-[#004AAD]/10"
                                            />
                                        </div>

                                        {/* Name + Email */}
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="mb-2 block text-sm font-medium text-gray-700"
                                                >
                                                    Your Name
                                                </label>

                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                    className="w-full rounded-xl border border-[#E1E1E1] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#004AAD] focus:ring-4 focus:ring-[#004AAD]/10"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block text-sm font-medium text-gray-700"
                                                >
                                                    Email
                                                </label>

                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="you@example.com"
                                                    className="w-full rounded-xl border border-[#E1E1E1] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#004AAD] focus:ring-4 focus:ring-[#004AAD]/10"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Phone
                                                <span className="ml-1 font-normal text-gray-400">
                                                    (optional)
                                                </span>
                                            </label>

                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your phone number"
                                                className="w-full rounded-xl border border-[#E1E1E1] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#004AAD] focus:ring-4 focus:ring-[#004AAD]/10"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Message
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Tell us a little about your business..."
                                                className="w-full resize-none rounded-xl border border-[#E1E1E1] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#004AAD] focus:ring-4 focus:ring-[#004AAD]/10"
                                            />
                                        </div>

                                        {/* Error */}
                                        {error && (
                                            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                                {error}
                                            </div>
                                        )}

                                        {/* Success */}
                                        {success && (
                                            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                                                Thanks! We'll get in touch
                                                with you soon.
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full rounded-full bg-[#004AAD] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#003B8F] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isSubmitting
                                                ? "Sending..."
                                                : "Send Message"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Small reassurance */}
                            <p className="mt-5 text-center text-xs text-gray-500">
                                We'll only use your details to get back to
                                you about Feedora.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section className="px-5 pb-16 sm:px-8 sm:pb-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative overflow-hidden rounded-4xl bg-[#004AAD] px-6 py-14 text-center sm:px-12 sm:py-20">
                            {/* subtle background */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: "url('/bg.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />

                            <div className="relative">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                    FEEDBACK THAT WORKS
                                </p>

                                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    Turn customer feedback into better
                                    reviews.
                                </h2>

                                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                                    Give your customers a simpler way to
                                    share what they really think.
                                </p>

                                <Link
                                    to="/"
                                    className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#004AAD] transition hover:bg-gray-100"
                                >
                                    Back to Feedora
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="border-t border-[#E7E4DF]/70 bg-white/80">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <Link to="/">
                        <img
                            src="/feedora.png"
                            alt="Feedora"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* <div className="flex items-center gap-5 text-sm text-gray-500">
                        <Link
                            to="/"
                            className="transition hover:text-[#004AAD]"
                        >
                            Home
                        </Link>

                        <a
                            href="/#how-it-works"
                            className="transition hover:text-[#004AAD]"
                        >
                            How it works
                        </a>
                    </div> */}

                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Feedora
                    </p>
                </div>
            </footer>
        </div>
    );
}