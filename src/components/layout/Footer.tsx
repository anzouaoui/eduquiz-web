"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-muted-foreground">
      <div className="container py-8">
        <p className="text-sm">© {currentYear} EduQuiz</p>
      </div>
    </footer>
  );
}
