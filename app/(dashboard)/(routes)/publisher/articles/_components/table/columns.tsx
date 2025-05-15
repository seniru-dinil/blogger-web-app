"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  MoreVertical,
  Pencil,
  PencilOff,
  Radio,
  Trash,
  ArrowUpDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Article from "@/model/article.model";

export const getColumns = (
  router: ReturnType<typeof useRouter>,
  onDelete: (articleId: number) => void
): ColumnDef<Article>[] => {
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <p className="text-slate-500">{row.getValue("id")}</p>;
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              className="mx-auto text-center"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-slate-700 font-semibold text-center">
            {row.getValue("title")}
          </p>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <p className="text-center">Category</p>,
      cell: ({ row }) => {
        const cato = row.original;
        if (cato.category) {
          return (
            <div className="border px-3 text-xs py-1 w-fit rounded-sm mx-auto">
              <p className="font-medium">{cato.category.name}</p>
            </div>
          );
        }
        return <p className="font-medium opacity-40 text-center">UNDEFINED</p>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <p className="text-center">Created date</p>,
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("createdAt")
        ).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return <p className="text-center">{formattedDate}</p>;
      },
    },
    {
      accessorKey: "isActive",
      header: () => <p className="text-left">Status</p>,
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") == true;
        return (
          <>
            {isActive ? (
              <div className="flex items-center gap-3 text-blue-500">
                <Radio size={18} className="animate-pulse" />
                <p>live</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 opacity-40">
                <PencilOff size={16} />
                <p>drafted</p>
              </div>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "isReported",
      header: "Reported",
      cell: ({ row }) => {
        const IsReported = row.getValue("isReported") === true;
        return (
          <>
            {IsReported ? (
              <div className="bg-red-50 px-3 py-1 text-xs w-fit rounded-sm">
                <p className="text-red-700">True</p>
              </div>
            ) : (
              <div className="bg-green-50 px-3 py-1 text-xs w-fit rounded">
                <p className="text-green-700">False</p>
              </div>
            )}
          </>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const article = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(String(article.title))
                  }
                >
                  Copy Article Name
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/publisher/articles/${article.id}`)
                  }
                >
                  Edit Article
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 "
                  onClick={() => setOpenDialogId(article.id || -1)}
                >
                  <Trash size={16} />
                  <p>Delete Article</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
              open={openDialogId === article.id}
              onOpenChange={() => setOpenDialogId(null)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the article <strong>{article.title}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(article.id || -1);
                      setOpenDialogId(null);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];
};
