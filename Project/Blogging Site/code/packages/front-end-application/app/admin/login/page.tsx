import {Card} from "@/app/_components";
import style from "./page.module.scss"

export default function (props:PageProps<"/admin/login">) {

    return (
        <Card className={[style.loginCard]}></Card>
    )
}