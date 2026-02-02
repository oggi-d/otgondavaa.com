import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscribeForm } from "@/components/subscribe-form";

interface SubscribeCardProps {
  className?: string;
}

export function SubscribeCard({ className }: SubscribeCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Намайг дагаж, мэдэгдэл авах</CardTitle>
        <CardDescription>
          Шинэ нийтлэл, эсвэл тооцоолуур гармагц имэйлээр мэдэгдэл аваарай.
        </CardDescription>
      </CardHeader>
      <CardContent className={className ? "flex-1" : undefined}>
        <SubscribeForm />
      </CardContent>
    </Card>
  );
}
