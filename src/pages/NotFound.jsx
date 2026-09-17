import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main
            className="relative min-h-dvh overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            {/* Soft overlay to keep the background subtle */}
            <div className="absolute inset-0 bg-white/35" />

            <div className="relative z-10 flex min-h-dvh flex-col">
                {/* Navbar */}
                <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-10">
                    <Link to="/" aria-label="Feedora home">
                        <img
                            src="/feedora.png"
                            alt="Feedora"
                            className="h-9 w-auto sm:h-10"
                        />
                    </Link>

                    <Link
                        to="/"
                        className="rounded-xl border border-[#004AAD]/20 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#004AAD] backdrop-blur-sm transition hover:bg-white active:scale-[0.98]"
                    >
                        Back to home
                    </Link>
                </header>

                {/* Main content */}
                <section className="flex flex-1 items-center justify-center px-6 py-16">
                    <div className="mx-auto max-w-2xl text-center">

                        {/* 404 */}
                        <p className="text-[100px] font-extrabold leading-none tracking-[-0.07em] text-[#004AAD]/15 sm:text-[150px]">
                            404
                        </p>

                        <div className="-mt-4 sm:-mt-8">
                            <span className="inline-flex items-center rounded-full border border-[#004AAD]/15 bg-white/65 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#004AAD] backdrop-blur-sm">
                                Page not found
                            </span>

                            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                                Looks like this page took a wrong turn.
                            </h1>

                            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#555] sm:text-lg">
                                The page you're looking for doesn't exist or may
                                have been moved. Let's get you back to Feedora.
                            </p>

                            <div className="mt-8 flex justify-center">
                                <Link
                                    to="/"
                                    className="rounded-xl bg-[#004AAD] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,74,173,0.18)] transition hover:bg-[#003d91] active:scale-[0.98]"
                                >
                                    Go to Feedora
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-6 text-center">
                    <p className="text-xs text-[#777]">
                        © 2026 Feedora. All rights reserved.
                    </p>
                </footer>
            </div>
        </main>
    );
}