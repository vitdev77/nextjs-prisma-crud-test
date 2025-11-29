"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUsers } from "@/actions/user.actions";

interface ButtonProps extends React.ComponentProps<typeof Button> {
  isPending: boolean;
}

export function UsersCombobox({ isPending }: ButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const [users, setUsers] = React.useState<
    { id: number; email: string; name: string | null }[]
  >([]);

  React.useEffect(() => {
    async function getAllUsers() {
      const fetchUsersData = await getUsers();
      setUsers(fetchUsersData);
    }
    getAllUsers();
  }, [getUsers]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isPending}
        >
          {userName ? (
            users.find((user) => user.name === userName)?.name
          ) : (
            <span className="text-muted-foreground">Select user</span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
        <Command>
          <CommandInput placeholder="Search user..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground">No user found.</span>
            </CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name || undefined}
                  onSelect={(currentName) => {
                    setUserName(currentName === userName ? "" : currentName);
                    setOpen(false);
                  }}
                >
                  {user.name}{" "}
                  <span className="text-muted-foreground">{user.email}</span>
                  <Check
                    className={cn(
                      "ml-auto",
                      userName === user.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
