export default function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-[1fr_min(70ch,calc(100%-2rem))_1fr] gap-x-4 pb-12 [&>*]:col-[2] [&>.full-bleed]:w-full [&>.full-bleed]:col-span-full">
      {children}
    </main>
  );
}
