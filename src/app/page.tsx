"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  return (
    <div className="p-4 space-y-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>
            <Badge>Test</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              onClick={() =>
                toast({
                  title: "Success",
                  description: "Toast notification works!",
                })
              }
            >
              コピー
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">シェア</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Twitter</DropdownMenuItem>
                <DropdownMenuItem>リンクコピー</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-2">フォロー</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
