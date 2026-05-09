'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background p-12 flex flex-col gap-8 max-w-2xl mx-auto">
      <h1 className="font-serif text-4xl font-light tracking-tight text-foreground">
        Streamer
      </h1>

      <div className="flex gap-3 items-center">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-sans text-card-foreground">Design tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-sans text-muted-foreground text-sm">
            Dark-only oklch palette. Accent is aged-paper beige.
          </p>
          <code className="font-mono text-xs text-accent block mt-3">
            --accent: oklch(0.78 0.045 80)
          </code>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif font-light">Confirmation</DialogTitle>
          </DialogHeader>
          <DialogDescription className="font-sans">
            Tokens, fonts, and registry all wired correctly.
          </DialogDescription>
          <code className="font-mono text-xs text-muted-foreground block">
            {new Date().toISOString()}
          </code>
        </DialogContent>
      </Dialog>
    </main>
  );
}
