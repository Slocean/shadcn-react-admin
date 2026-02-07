import { NavLink } from "react-router";
import logoImage from "@/assets/images/logo/cartoon.png";
import { cn } from "@/utils";

interface Props {
	size?: number | string;
	className?: string;
}
function Logo({ size = 50, className }: Props) {
	return (
		<NavLink to="/" className={cn(className)}>
			<img src={logoImage} alt="logo" style={{ width: size, height: size, objectFit: "contain" }} />
		</NavLink>
	);
}

export default Logo;
