import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/utils";

export function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
	const [show, setShow] = React.useState(false);

	return (
		<div className="relative">
			<Input {...props} type={show ? "text" : "password"} className={cn("pr-10", className)} />

			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-0 h-full px-3"
				onClick={() => setShow((v) => !v)}
				aria-label={show ? "Hide password" : "Show password"}
				aria-pressed={show}
			>
				{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
			</Button>
		</div>
	);
}
