"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface UserButtonProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  signOut: () => void;
}

export function UserButton({ user, signOut }: UserButtonProps) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {user.image ? (
            <Image
              src={user.image || "/placeholder.svg"}
              alt={user.name || "User avatar"}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {user.name?.charAt(0) || "U"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onSelect={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
