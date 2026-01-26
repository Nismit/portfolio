'use client';

import { Container } from '@/components/Layout/styledComponents';

export default function MainContainer({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
