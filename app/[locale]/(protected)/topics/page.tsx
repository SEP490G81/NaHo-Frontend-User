import {redirect} from "next/navigation";

/** Thư viện sách đã chuyển sang /books → điều hướng để giữ tương thích link cũ. */
const TopicsRedirectPage = () => {
    return redirect("/books");
};

export default TopicsRedirectPage;
