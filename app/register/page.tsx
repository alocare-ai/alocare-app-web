import { redirect } from "next/navigation";

export default function RegisterPage() {
  redirect("/login?notice=registration_disabled");
}
