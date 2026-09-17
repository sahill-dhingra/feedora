import { useState } from "react";
import {
    QrCode,
    MessageSquareText,
    Sparkles,
    Share2,
    ArrowRight,
    CheckCircle2,
    Menu,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Home() {
    // =========================================================
    // ASSET PATHS
    // Change these if your files have different names.
    // =========================================================
    const LOGO = "/feedora.png";
    const PHONE = "/iphone.png";
    const BACKGROUND = "/bg.png";
    const navigate = useNavigate();


    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const steps = [
        {
            number: "01",
            title: "Scan the QR",
            description:
                "Customers scan the QR code provided by your business.",
            icon: QrCode,
        },
        {
            number: "02",
            title: "Share their experience",
            description:
                "They answer a few quick questions about what they liked and what could be improved.",
            icon: MessageSquareText,
        },
        {
            number: "03",
            title: "Get an editable review",
            description:
                "Their feedback is turned into a natural review draft using AI.",
            icon: Sparkles,
        },
        {
            number: "04",
            title: "Share on Google",
            description:
                "Customers can edit the draft before continuing to Google and posting it themselves.",
            icon: Share2,
        },
    ];

    const benefits = [
        {
            eyebrow: "MORE REVIEWS",
            title: "Make sharing easier",
            description:
                "Make it easier for satisfied customers to leave a review.",
            icon: CheckCircle2,
        },
        {
            eyebrow: "CUSTOMER FEEDBACK",
            title: "Hear what matters",
            description:
                "Give customers a quick way to tell you what they liked and what could improve.",
            icon: MessageSquareText,
        },
        {
            eyebrow: "CUSTOMER CONTROLLED",
            title: "They stay in control",
            description:
                "Customers can review and edit their AI-generated draft before posting.",
            icon: CheckCircle2,
        },
    ];

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden bg-white text-[#171717]"
            style={{
                backgroundImage: `url(${BACKGROUND})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* =====================================================
          NAVBAR
      ====================================================== */}
            <header className="sticky top-0 z-50 border-b border-[#E7E4DF]/70 bg-white/90 backdrop-blur-sm">
                <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] focus-visible:ring-offset-2"
                        aria-label="Go to homepage"
                    >
                        <img
                            src={LOGO}
                            alt="Feedora"
                            className="h-8 w-auto sm:h-9"
                        />
                    </button>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <button
                            type="button"
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-sm font-medium text-[#454545] transition-colors hover:text-[#004AAD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] focus-visible:ring-offset-4"
                        >
                            How it works
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("final-cta")}
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#004AAD] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#003D8F] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] focus-visible:ring-offset-2"
                        >
                            Get Started
                        </button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#171717] transition-colors hover:bg-[#E7E4DF]/50 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD]"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <X size={22} strokeWidth={1.8} />
                        ) : (
                            <Menu size={22} strokeWidth={1.8} />
                        )}
                    </button>
                </div>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="border-t border-[#E7E4DF]/70 bg-white px-5 py-5 md:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToSection("how-it-works")}
                                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#454545] hover:bg-[#E7E4DF]/40"
                            >
                                How it works
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection("final-cta")}
                                className="rounded-full bg-[#004AAD] px-5 py-3 text-sm font-semibold text-white"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* =====================================================
    HERO
====================================================== */}
                <section className="relative">
                    <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-6 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:px-10 lg:py-6">

                        {/* Hero content */}
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E7E4DF] bg-white/75 px-4 py-2 text-xs font-semibold tracking-wide text-[#004AAD] backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#004AAD]" />
                                CUSTOMER FEEDBACK, MADE USEFUL
                            </div>

                            <h1 className="max-w-170 text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[#151515]">
                                Turn happy customers into{" "}
                                <span className="text-[#004AAD]">
                                    genuine Google reviews.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#555555] sm:text-lg sm:leading-8">
                                Make it easier for customers to share their experience.
                                Collect quick feedback, turn it into an editable review,
                                and send them directly to Google.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection("final-cta")}
                                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#004AAD] px-7 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#003D8F] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] focus-visible:ring-offset-2"
                                >
                                    Get Started

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/review/3892d88c-14f8-4383-8b38-67067dfbc8ac"
                                        )} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D9D6D1] bg-white/70 px-7 text-sm font-semibold text-[#303030] transition-all duration-200 hover:border-[#004AAD]/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD] focus-visible:ring-offset-2"
                                >
                                    See It in Action
                                </button>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="relative flex items-center justify-center lg:justify-end">
                            <div className="absolute h-80 w-80 rounded-full bg-white/45 blur-3xl sm:h-96 sm:w-96" />

                            <img
                                src={PHONE}
                                alt="Feedora review experience displayed on an iPhone"
                                className="relative z-10 w-[min(55vw,300px)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.14)] transition-transform duration-500 hover:-translate-y-2 sm:w-[min(45vw,330px)] lg:w-[min(28vw,350px)]"
                            />
                        </div>
                    </div>
                </section>

                {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
                <section
                    id="how-it-works"
                    className="scroll-mt-24 border-y border-[#E7E4DF]/70 bg-white/65"
                >
                    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
                        {/* Section heading */}
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#004AAD]">
                                THE JOURNEY
                            </p>

                            <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#171717] sm:text-4xl lg:text-5xl">
                                How it works
                            </h2>

                            <p className="mt-5 text-base leading-7 text-[#666666] sm:text-lg">
                                From customer feedback to a review they can share in just a
                                few steps.
                            </p>
                        </div>

                        {/* Desktop flow */}
                        <div className="relative mt-16 hidden lg:block">
                            {/* Connecting line */}
                            <div className="absolute left-[12.5%] right-[12.5%] top-7.25 h-px bg-[#004AAD]/25" />

                            <div className="grid grid-cols-4 gap-8">
                                {steps.map((step) => {
                                    const Icon = step.icon;

                                    return (
                                        <div
                                            key={step.number}
                                            className="relative flex flex-col items-center text-center"
                                        >
                                            <div className="relative z-10 flex h-14.5 w-14.5 items-center justify-center rounded-full border border-[#004AAD]/20 bg-white text-[#004AAD] shadow-[0_8px_25px_rgba(0,74,173,0.08)]">
                                                <Icon size={22} strokeWidth={1.7} />
                                            </div>

                                            <p className="mt-6 text-xs font-bold tracking-[0.16em] text-[#004AAD]">
                                                {step.number}
                                            </p>

                                            <h3 className="mt-3 text-lg font-semibold text-[#171717]">
                                                {step.title}
                                            </h3>

                                            <p className="mt-3 max-w-57.5 text-sm leading-6 text-[#6B6B6B]">
                                                {step.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile / tablet flow */}
                        <div className="relative mt-14 lg:hidden">
                            <div className="absolute bottom-8 left-7 top-8 w-px bg-[#004AAD]/20" />

                            <div className="space-y-9">
                                {steps.map((step) => {
                                    const Icon = step.icon;

                                    return (
                                        <div
                                            key={step.number}
                                            className="relative flex gap-5"
                                        >
                                            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#004AAD]/20 bg-white text-[#004AAD] shadow-sm">
                                                <Icon size={21} strokeWidth={1.7} />
                                            </div>

                                            <div className="pt-1">
                                                <p className="text-xs font-bold tracking-[0.16em] text-[#004AAD]">
                                                    {step.number}
                                                </p>

                                                <h3 className="mt-1.5 text-lg font-semibold text-[#171717]">
                                                    {step.title}
                                                </h3>

                                                <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B6B6B] sm:text-base">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
            BUILT FOR BUSINESSES
        ====================================================== */}
                <section className="relative">
                    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
                            {/* Heading */}
                            <div>
                                <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#004AAD]">
                                    FOR YOUR BUSINESS
                                </p>

                                <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-[-0.03em] text-[#171717] sm:text-4xl lg:text-5xl">
                                    Built for businesses
                                </h2>

                                <p className="mt-5 max-w-lg text-base leading-7 text-[#666666] sm:text-lg">
                                    Turn customer experiences into meaningful feedback and
                                    reviews.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
                                {benefits.map((benefit) => {
                                    const Icon = benefit.icon;

                                    return (
                                        <article
                                            key={benefit.eyebrow}
                                            className="group border-t border-[#D9D6D1] bg-white/35 px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#004AAD]/40"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004AAD]/[0.07] text-[#004AAD]">
                                                <Icon size={19} strokeWidth={1.8} />
                                            </div>

                                            <p className="mt-6 text-[10px] font-bold tracking-[0.15em] text-[#004AAD]">
                                                {benefit.eyebrow}
                                            </p>

                                            <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-[#171717]">
                                                {benefit.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-[#686868]">
                                                {benefit.description}
                                            </p>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
            FINAL CTA
        ====================================================== */}
                <section
                    id="final-cta"
                    className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28"
                >
                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#004AAD] px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-24">
                        {/* Subtle background treatment using supplied asset */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.12]"
                            style={{
                                backgroundImage: `url(${BACKGROUND})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                mixBlendMode: "screen",
                            }}
                        />

                        <div className="relative z-10 mx-auto max-w-2xl">
                            <p className="text-xs font-bold tracking-[0.18em] text-white/70">
                                MAKE EVERY EXPERIENCE COUNT
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                                Give every customer a voice.
                            </h2>

                            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                                Make it easier for happy customers to share their
                                experience.
                            </p>

                            <button
                                type="button"
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#004AAD] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F7F7F7] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#004AAD]"
                            >
                                Get Started
                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* =====================================================
          FOOTER
      ====================================================== */}
            <footer className="border-t border-[#E7E4DF]/80 bg-white/70">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                    <div className="flex items-center">
                        <img
                            src={LOGO}
                            alt="Feedora"
                            className="h-7 w-auto"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
                        <button
                            type="button"
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-sm text-[#666666] transition-colors hover:text-[#004AAD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004AAD]"
                        >
                            How it works
                        </button>

                        <p className="text-xs text-[#888888]">
                            © {new Date().getFullYear()} Feedora. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}