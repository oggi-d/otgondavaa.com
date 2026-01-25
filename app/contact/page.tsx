"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Мессеж амжилттай илгээгдлээ!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Алдаа гарлаа" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Мессеж илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Холбоо барих</h1>
        <p className="text-lg text-muted-foreground">
          Асуулт байна уу, эсвэл холбогдохыг хүсч байна уу?
          <br />
          Та доор и-мэйл илгээгээрэй 😊!
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>И-мэйл илгээх</CardTitle>
          <CardDescription>
            Би таньд удаахгүй хариу өгөхийг хичээнэ. 😅
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Нэр *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Таны нэр"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Имэйл *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="таны@имэйл.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Мессеж *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Таны мессеж..."
                rows={6}
              />
            </div>
            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Илгээж байна..." : "Мессеж илгээх"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
