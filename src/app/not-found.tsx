import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <div className="mt-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-error-404 size-36"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 8v3a1 1 0 0 0 1 1h3" />
              <path d="M7 8v8" />
              <path d="M17 8v3a1 1 0 0 0 1 1h3" />
              <path d="M21 8v8" />
              <path d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
            </svg>
          </EmptyMedia>

          <EmptyTitle>This page does not exist</EmptyTitle>
          <EmptyDescription>
            {"The page you're looking for doesn't exist."}
            <Link href={"/"} passHref>
              <Button asChild>Go to homepage</Button>
            </Link>
          </EmptyDescription>

          <EmptyContent>
            <Button asChild>
              <Link href={"/"} passHref>
                Go to homepage
              </Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
