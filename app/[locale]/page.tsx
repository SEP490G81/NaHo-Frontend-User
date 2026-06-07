import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/server/user.service";

const IndexPage = async () => {
    const user = await getCurrentUser();
    if (user) {
        redirect("/dashboard");
    } else {
        redirect("/home");
    }
};

export default IndexPage;
