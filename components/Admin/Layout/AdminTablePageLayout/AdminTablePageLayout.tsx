import React from 'react';

import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs';

import Heading from '../../UI/Heading/Heading';

interface AdminTablePageLayoutProps {
  title: string;
  ctaButton?: React.ReactNode;
  table: React.ReactNode;
  modal: React.ReactNode;
}

export default function AdminTablePageLayout({
  title,
  ctaButton,
  table,
  modal,
}: AdminTablePageLayoutProps) {
  return (
    <div className="container mx-auto py-16">
      <Breadcrumbs />
      <Heading>{title}</Heading>
      {ctaButton && <section className="mb-8">{ctaButton}</section>}
      <section className="mb-8">{table}</section>
      {modal && <section className="mb-8">{modal}</section>}
    </div>
  );
}
