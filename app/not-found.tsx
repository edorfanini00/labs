import { Container, Button } from "@/components/ui";
import { Mark } from "@/components/logo";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="max-w-xl text-center">
        <Mark className="mx-auto h-12 w-12 text-cobalt" tone="var(--color-cobalt)" />
        <h1 className="mt-6 font-serif text-5xl tracking-tight">Nothing here.</h1>
        <p className="mt-4 text-muted">
          The page you are looking for is not in our records. Try the catalog or
          verify a certificate instead.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/compounds">Browse compounds</Button>
          <Button href="/verify" variant="ghost">
            Verify a COA
          </Button>
        </div>
      </Container>
    </section>
  );
}
